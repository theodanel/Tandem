<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->timestamp('date')->nullable();
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->boolean('open')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete()->default(5);
            $table->integer('collaborators')->nullable();
            $table->integer('participants_max')->nullable();
            $table->integer('popularity')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
