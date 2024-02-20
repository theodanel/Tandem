<?php

namespace Database\Seeders;

use App\Models\Avatar;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AvatarSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Récupère le contenu du dossier avatar sous forme de tableau
        $filesInFolder = scandir('public/images/avatars');   
    
        // parcourt le tableau en évitant les 2 premiers éléments (artefacts)
        for($i=2; $i<count($filesInFolder); $i++){
            // récupère les informations du fichier
            $file = pathinfo($filesInFolder[$i]);
            // créé une nouvelle entrée dans la table Avatar contenant l'URL de l'image
            Avatar::create(['url'=>$file['basename']]);
        }  
    }
}
