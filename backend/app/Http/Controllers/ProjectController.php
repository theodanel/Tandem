<?php

namespace App\Http\Controllers;

use App\Models\Language;
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
            'description' => "required|max:1000",
            'collaborators_max' => "required|numeric"
            
        ]);
        

        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "message" => "Erreur dans le formulaire",
                'status' => "error",
            ]);
        } else{
            $project = new Project();
            $project->title = $request->input('title');
            $project->description = $request->input('description');
            $project->collaborators_max = $request->input('collaborators_max');
            $project->collaborators = 1;
            $project->user_id = random_int(1,10);
            $project->creator = 5;
            $project->status = 1;
            $project->open = true;
            $project->popularity = 0;

            
            $project->save();

            $project->language()->sync($request->languages);

            return response()-> json([
                'status' => 200,
                "message" => "Le projet a été ajouté."
            ]);
        }
    }


    public function update(Request $request, $id){
        $validator = Validator::make($request->all(),[
            'newTitle' => "max:50",
            'newDescription' => "max:1000",
            'newCollaborators' => "numeric"
        ]);
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                "messages" => "Erreur dans le formulaire."
            ]);
        } else {
            $project = Project::findOrFail($id);
            $project->title = $request->input("newTitle");
            $project->description = $request->input("newDescription");
            $project->collaborators = $request->input("newCollaborators");
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
