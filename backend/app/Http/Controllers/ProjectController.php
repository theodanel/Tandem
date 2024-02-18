<?php

namespace App\Http\Controllers;

use App\Models\Language;
use App\Models\Project;
use App\Models\User;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;


class ProjectController extends Controller
{
    /**
     * Affichage de tous les projets
     */
    function index() {
        $projects = Project::all();
        return response()->json([
            'projects' => $projects,
            "status" => 200,
        ]);
    }

    /**
     * Affiche un seul projet
     */
    function show($id) {
        $project = Project::findOrFail($id);
        return response()->json([
            'project' => $project,
            "status"=> 200,
        ]);
    }

    /**
     * Enregistre un nouveau projet
     */
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
            $project->status = 'created';
            $project->open = true;
            $project->popularity = 0;
            $project->image = "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

            
            $project->save();

            $project->language()->sync($request->languages);

            return response()-> json([
                'status' => 200,
                "message" => "Le projet a été ajouté."
            ]);
        }
    }


    /**
     * Met à jour les infos d'un projet existant
     */
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

    /**
     * Ajoute le projet aux favoris
     */
    public function addToFavorites($id){
        $user_id = auth()->user()->id;
        User::find($user_id)->favorite()->attach($id);
    }

    /**
     * Retire le projet des favoris
     */
    public function removeFromFavorites($id){
        $user_id = auth()->user()->id;
        User::find($user_id)->favorite()->detach($id);
    }

    /**
     * Supprime un projet
     */
    public function delete($id){
        Project::destroy($id);
        return response()->json([
            'status' => 200,
            "message" => "Le projet a été supprimé"
        ]);
    }
}
