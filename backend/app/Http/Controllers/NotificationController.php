<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use PHPUnit\Framework\TestStatus\Notice;

class NotificationController extends Controller
{
    /**
     * Affiche les notifications reçues
     */
    public function showReceived ($id){
        $user = User::find($id);
        $notifications = $user->notifications_received()->get();
        // Attribution de l'expediteur et du projet associé à chaque notification
        foreach($notifications as $notification){
            $notification->sender = $notification->sender()->first();
            $notification->project = $notification->project()->first();
        }

        return response()->json([
            'notifications' => $notifications,
        ]);
    }

    /**
     * Affiche les notifications envoyées
     */
    public function showSent ($id){
        $user = User::find($id);
        $notifications = $user->notifications_sent()->get();
         // Attribution du destinataire et du projet associé à chaque notification
        foreach($notifications as $notification){
            $notification->receiver = $notification->receiver()->first();
            $notification->project = $notification->project()->first();
        }
  
        return response()->json([
            'notifications' => $notifications,
        ]);
    }

    /**
     * Envoi d'une notification
     */
    public function send (Request $request){
        $validator = Validator::make($request->all(),[
            'content' => "max:200",
        ]);
        if($validator->fails()){
            return response()->json([
                'errors' => $validator->messages(),
                'status' => "error"
            ]);
        }else{
            $notification = new Notification();
            $notification->sender_id = $request->sender_id;
            $notification->receiver_id = $request->receiver_id;
            $notification->project_id = $request->project_id ?? null;
            $notification->type = $request->type;
            $notification->open = false;
            $notification->content = $request->content ?? "";
            $notification->save();
            
            return response()->json([
                'status' => 200
            ]);
        }
    }

    /**
     * Supprime une notification
     */
    public function delete ($id){
        Notification::destroy($id);
    }
}
