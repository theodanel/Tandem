<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    public function show($id){
        $project = Project::find($id);
        $comments = $project->comment()->get();
        $commentsList = [];
        foreach($comments as $comment){
            array_push($commentsList, [
                'id' => $comment->id,
                'content' => $comment->comment,
                'user' => $comment->user()->get(),
                'admin' => $project->admin,
                'date' => $project->created_at,
                'comment' => $project->comment_id ?? null,
            ]);
        }
        return response()->json([
            'comments' => $comments
        ]);
    }

    public function create(Request $request, $project_id, $comment_id = null){
        $validator = Validator::make($request->all(),[
            'content' => "min:3|max:1000",
        ]);
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                'status' => "error"
            ]);
        } else {
            $comment = new Comment();
            $comment->content = $request->content;
            $comment->user_id = auth()->user()->id;
            $comment->comment_id = $comment_id;
            $comment->project_id = $project_id;

            $project = Project::find($project_id);
            if($project->user_id === auth()->user()->id){
                $comment->admin = true;
            } else {
                $comment->admin = false;
            }

            $comment->save();

            return response()->json([
                'status' => "success"
            ]);
        }
    }

    public function update(Request $request, $id){
        $comment = Comment::find($id);
        if($comment->user_id === auth()->user()->id){
            $validator = Validator::make($request->all(),[
                'content' => "min:3|max:1000",
            ]);
            if($validator->fails()){
                return response()->json([
                    'errors' => $validator->messages(),
                    'status' => "error"
                ]);
            } else {
                
                $comment->content = $request->content;
                $comment->save();
                
                return response()->json([
                    'status' => "success"
                ]);
            }
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }

    public function delete($id){
        $comment = Comment::find($id);
        $admin_id = $comment->project()->get()->user_id;
        if($admin_id === auth()->user()->id || $comment->user_id === auth()->user()->id ){
            Comment::destroy($id);

            return response()->json([
                'status' => 'success'
            ]);
        } else {
            return response()->json([
                'status' => 'error'
            ]);
        }
    }
}
