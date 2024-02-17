<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // création de 10 projets aléatoires
        Project::factory(10)->create()->each(function($project){
            // Pour associer les utilisateurs aux projets :

            // déclaration du tableau users_id
            $users_id = [1,2,3,4,5,6,7,8,9,10];
            
            // récupération du nombre de collaborateurs sur le projet (dont le créateur)
            $collaborators = $project->collaborators;

            // récupération de l'id du créateur du projet
            $creator = $project->user_id;

            // association du créateur au projet 
            $project->collaborator()->attach($creator);

            // retrait de l'id du créateur du projet de la liste des id
            unset($users_id[$creator-1]);

            for ($i = 1 ; $i < $collaborators ; $i++){
                // selection d'un ID d'utilisateur aléatoire 
                $collaborator_id = array_rand($users_id, 1);

                // association de cet utilisateur au projet
                $project->collaborator()->attach($users_id[$collaborator_id]);

                // retrait de l'id de l'utilisateur de la liste des id
                unset($users_id[$collaborator_id]);
            }

            // attribution des langages :
            $project->language()->attach([random_int(1,3),random_int(4,6),random_int(7,9)]);

            // favoris :
            $project->favorite()->attach([random_int(1,3),random_int(4,6),random_int(7,10)]);
        });
    }
}
