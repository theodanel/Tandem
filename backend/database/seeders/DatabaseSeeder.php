<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Project;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        
        // créé 10 utilisateurs aléatoires
        $users = User::factory(10)->create();
    
        // créé 10 projects aléatoires
        $projects = Project::factory(10)->create();

        

        // Pour associer les utilisateurs aux projets :

        // déclaration du tableau users_id en dehors des boucles
        $users_id = [];

        foreach ($projects as $index => $project){
            // récupération du nombre de collaborateurs sur le projet (dont le créateur)
            $collaborators = Project::find($index+1)->collaborators;

            // récupération de l'id du créateur du projet
            $creator = Project::find($index+1)->creator;

            // remplissage du tableau users
            foreach ($users as $user){
                array_push($users_id, $user->id);
            }

            // association du créateur au projet 
            $project->collaborators()->attach($creator);

            // retrait de l'id du créateur du projet de la liste des id
            unset($users_id[$creator-1]);

            for ($i = 1 ; $i < $collaborators ; $i++){
                // selection d'un ID d'utilisateur aléatoire 
                $collaborator_id = array_rand($users_id, 1);

                // association de cet utilisateur au projet
                $project->collaborators()->attach($users_id[$collaborator_id]);

                // retrait de l'id de l'utilisateur de la liste des id
                unset($users_id[$collaborator_id]);
                
            }

            // réinitialisation du tableau id
            $users_id = [];
        }

    }
}
