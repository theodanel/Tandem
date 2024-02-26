<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Affiche les commentaires d'un projet
     */
    public function show($id){
        $project = Project::find($id);
        $comments = $project->comments()->get();
        // Attribution de l'utilisateur et de son avatar pour chaque commentaire du projet
        foreach($comments as $comment){
            $user = $comment->user()->first();
            $avatar = $user->avatar()->first();
            $user->avatar = $avatar;
            $comment->user = $user;
        }
        return response()->json([
            'comments' => $comments
        ]);
    }

    /**
     * Création d'un nouveau commentaire / Réponse à un commentaire
     * 
     * @param  $request Contenu du commentaire
     * @param int $project_id ID du projet commenté
     * @param int $comment_id ID du commentaire auquel celui-ci répond (facultatif)
     */
    public function store(Request $request, $project_id, $comment_id = null){
        // $validator = Validator::make($request, "min:3|max:1000");
        // if($validator->fails()){
        //     return response()->json([
        //         'errors' => $validator->messages(),
        //         'status' => "error"
        //     ]);
        // } else {
            $content = $request->all();

            $comment = new Comment();
            $comment->content = $content["comment"];
            $comment->user_id = auth()->user()->id;
            $comment->comment_id = $comment_id;
            $comment->project_id = $project_id;
            
            $project = Project::find($project_id);
            if($project->user_id == auth()->user()->id){
                $comment->admin = true;
            } else {
                $comment->admin = false;
            }

            $comment->save();

            return response()->json([
                'status' => 200
            ]);
        }
    // }

    /**
     * Mise à jour d'un commentaire
     * 
     * @param string $request Contenu du commentaire
     */
    public function update(Request $request, $id){
        $comment = Comment::find($id);
        // Autorisation seulement à l'auteur du commentaire
        if($comment->user_id == auth()->user()->id){
            $validator = Validator::make($request,"min:3|max:1000");
            if($validator->fails()){
                return response()->json([
                    'errors' => $validator->messages(),
                    'status' => "error"
                ]);
            } else {
                $comment->content = $request;
                $comment->save();
                
                return response()->json([
                    'status' => 200
                ]);
            }
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }

    /**
     * Suppression d'un commentaire
     */
    public function delete($id){
        $comment = Comment::find($id);
        $admin_id = $comment->project()->get()->user_id;
        // Autorisation seulement à l'auteur du commentaire ou au créateur du projet
        if($admin_id == auth()->user()->id || $comment->user_id === auth()->user()->id ){
            Comment::destroy($id);

            return response()->json([
                'status' => 200
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }
}
