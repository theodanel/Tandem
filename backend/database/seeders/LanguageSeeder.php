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
                    'html5'
                ],
                [
                    'CSS',
                    'css3'
                ],
                [
                    'JavaScript',
                    'javascript'
                ],
                [
                    'PHP',
                    'php'
                ],
                [
                    'SASS',
                    'sass'
                ],
                [
                    'NodeJS',
                    'nodejs'
                ],

                [
                    'Python',
                    'python',
                ],
                [
                    'Perl',
                    'perl'
                ],
                [
                    "C",
                    "c"
                ],
                [
                    "C++",
                    "cplusplus"
                ],
                [
                    "C#",
                    "csharp"
                ],
                [
                    ".Net",
                    "dot-net"
                ],
                [
                    "Java",
                    "java"
                ],
                [
                    "Ruby",
                    "ruby"
                ],
                [
                    "R",
                    "r"
                ],
                [
                    "GO",
                    "go"
                ],
                [
                    "Swift",
                    "swift"
                ],
                [
                    "Rust",
                    "rust"
                ],
                [
                    "TypeScript",
                    "typescript"
                ],
                [
                    "Kotlin",
                    "kotlin"
                ],


                [
                    "Tailwind",
                    "tailwindcss"
                ],
                [
                    "Bootstrap",                 
                    "bootstrap",                 
                ],
                [
                    "React",
                    "react",
                ],
                [
                    "Laravel",
                    "laravel",
                ],
                [
                    "Symfony",
                    "symfony",
                ],
                [
                    "NextJS",
                    "nextjs",
                ],
                [
                    'Vue',
                    'vuejs',
                ],
                [
                    "Angular",
                    "angular",
                ],
                [
                    "NuxtJS",
                    "nuxtjs",
                ],
                [
                    "NestJS",
                    "nestjs",
                ],
                [
                    "Spring",
                    "spring",
                ],
                
                
                [
                    "MySQL",
                    "mysql",
                ],
                [
                    "MongoDB",
                    "mongodb",
                ],
                [
                    "PostgreSQL",
                    "postgresql"
                ],
                [
                    "Godot",
                    "godot",
                ],
                [
                    "Unity",
                    "unity",
                ],
                [
                    "WordPress",
                    "wordpress",
                ],
                [
                    "Docker",
                    "docker",
                ],
                [
                    "Kubernetes",
                    "kubernetes",
                ],
                [
                    "Android",
                    "android",
                ],
                [
                    "Apple",
                    "apple",
                ],
                [
                    "Electron",
                    "electron",
                ],

            ];

        // création de langages :
        foreach($languages as $language){
            Language::create([
                'name' => $language[0],
                // 'category' => $language[1],
                'logo' => "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/$language[1]/$language[1]-original.svg",
            ]);
        }
    }
}
