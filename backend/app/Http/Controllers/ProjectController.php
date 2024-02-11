<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class ProjectController extends Controller
{
    function index() {
        $projects = Project::all();
        return response()->json([
            'projects' => $projects,
            "status" => 200,
        ]);
    }

    function show($id) {
        $project = Project::findOrFail($id);
        return response()->json([
            'project' => $project,
            "status"=> 200,
        ]);
    }

    public function store(Request $request){
        $validator = Validator::make($request->all(), [
            'title' => "required|unique:projects,title|max:50",
            'description' => "required|max:100",
            'contributors' => "required|min:1|min:10"
            
        ]);
        

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "message" => "Erreur dans le formulaire"
            ]);
        } else{
            $project = new Project();
            $project->title = $request->input('title');
            $project->description = $request->input('description');
            $project->contributors = $request->input('contributors');

            $project->save();

            return response()-> json([
                'status' => 200,
                "message" => "Le projet a été ajouté."
            ]);
        }
    }


    public function update(Request $request, $id){
        $validator = Validator::make($request->all,[
            'newTitle' => "required|unique:projects,title|max:50",
        ]);
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "messages" => "Erreur dans le formulaire."
            ]);
        } else {
            $project = Project::findOrFail($id);
            $project->title = $request->input("newTitle");
            $project->save();

            return response()->json([
                'status' => 200,
                "message" => "Le projet a été ajouté."
            ]);
        }
    }

    public function delete($id){
        Project::destroy($id);
        return response()->json([
            'status' => 200,
            "message" => "Le projet a été supprimé"
        ]);
    }
}
