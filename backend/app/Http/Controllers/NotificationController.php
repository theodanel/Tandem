<?php

namespace App\Http\Controllers;

use App\Models\Notification;
use App\Models\Project;
use App\Models\User;
use Illuminate\Http\Request;
use PHPUnit\Framework\TestStatus\Notice;

class NotificationController extends Controller
{
    /**
     * Affiche les notifications reçues
     */
    public function showReceived ($id){
        $user = User::find($id);
        $notifications = $user->notifications_received()->get();
        $notificationsList = [];
        foreach($notifications as $notification){
            array_push($notificationsList, [
                'sender' => $notification->sender()->get(),
                'project' => $notification->project()->get(),
                'content' => $notification->content,
                'type' => $notification->type,
                'date' => $notification->created_at,
                'open' => $notification->open,
            ]);
        }
        return response()->json([
            'notifications' => $notificationsList,
        ]);
    }

    /**
     * Affiche les notifications envoyées
     */
    public function showSent ($id){
        $user = User::find($id);
        $notifications = $user->notifications_sent()->get();
        $notificationsList = [];
        foreach($notifications as $notification){
            array_push($notificationsList, [
                'receiver' => $notification->receiver()->get(),
                'project' => $notification->project()->get(),
                'content' => $notification->content,
                'type' => $notification->type,
                'date' => $notification->created_at,
                'open' => $notification->open,
                'id' => $notification->id,
            ]);
        }
        return response()->json([
            'notifications' => $notificationsList,
        ]);
    }

    /**
     * Envoie une notification
     */
    public function send (Request $request){
        $notification = new Notification();
        $notification->sender_id = $request->sender_id;
        $notification->receiver_id = $request->receiver_id;
        $notification->project_id = $request->project_id ?? null;
        $notification->type = $request->type;
        $notification->open = false;
        $notification->content = $request->content ?? "";
        $notification->save();

        return response()->json([
            'status' => 'success'
        ]);
    }

    /**
     * Supprime une notification
     */
    public function delete ($id){
        Notification::destroy($id);
    }
}
