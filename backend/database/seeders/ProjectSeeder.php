<?php

namespace Database\Seeders;

use App\Models\Project;
use App\Models\User;
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

            // attribution des langages :
            $project->language()->attach([random_int(1,3),random_int(4,6),random_int(7,9)]);

            // favoris :
            $project->favorite()->attach([random_int(1,3),random_int(4,6),random_int(7,10)]);
        });

        Project::factory()->create([
            'title' => "Mem'téo",
            'description' => "Y'a pu d'saisons ma bonne dame !",
            'open' => false,
            'user_id' => 14,
            'collaborators' => 4,
            'collaborators_max' => 4,
            'popularity' => random_int(100,200),
            'image' => "https://images.unsplash.com/photo-1582485565167-75055e5e6b5b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ])->collaborators()->attach([14, 12, 13, 15]);

        Project::factory()->create([
            'title' => "Lir'mersion",
            'description' => "Plongez dans vos meilleures lectures.",
            'open' => true,
            'user_id' => 21,
            'collaborators' => 2,
            'collaborators_max' => 4,
            'popularity' => random_int(50,150),
            'image' => "https://images.unsplash.com/photo-1551029506-0807df4e2031?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ])->collaborators()->attach([21, 20]);

        Project::factory()->create([
            'title' => "Maison Namasté",
            'description' => "Vous êtes entre de bonnes mains.",
            'open' => false,
            'user_id' => 16,
            'collaborators' => 4,
            'collaborators_max' => 4,
            'popularity' => random_int(50,150),
            'image' => "https://images.unsplash.com/photo-1474557157379-8aa74a6ef541?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ])->collaborators()->attach([16, 17, 18, 19]);

        Project::factory()->create([
            'title' => "Taskinator",
            'description' => "Restez concentrés !",
            'open' => true,
            'user_id' => 22,
            'collaborators' => 2,
            'collaborators_max' => 2,
            'popularity' => random_int(50,100),
            'image' => "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        ])->collaborators()->attach([22, 23]);
    }
}
