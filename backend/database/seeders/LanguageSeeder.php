<?php

namespace Database\Seeders;

use App\Models\Language;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LanguageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $languages = [
                [
                    'HTML',
                    'front',
                    'html5'
                ],
                [
                    'CSS',
                    'front',
                    'css3'
                ],
                [
                    'JavaScript',
                    'front',
                    'javascript'
                ],
                [
                    'PHP',
                    'back',
                    'php'
                ],
                [
                    'SASS',
                    'front',
                    'sass'
                ],
                [
                    'Laravel',
                    'back',
                    'laravel'
                ],
                [
                    'NodeJS',
                    'back',
                    'nodejs'
                ],
                [
                    'React',
                    'front',
                    'react'
                ],
                [
                    'MySQL',
                    'back',
                    'mysql'
                ],
            ];

        // création de langages :
        foreach($languages as $language){
            Language::create([
                'name' => $language[0],
                'category' => $language[1],
                'logo' => "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/$language[2]/$language[2]-original.svg",
            ]);
        }
    }
}
