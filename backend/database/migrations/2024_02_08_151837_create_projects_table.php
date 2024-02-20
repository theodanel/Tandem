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
            $table->string('title')->nullable();
            $table->text('description')->nullable();
            $table->boolean('open')->nullable();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->integer('collaborators')->nullable();
            $table->integer('collaborators_max')->nullable();
            $table->integer('popularity')->nullable();
            $table->string('image')->nullable();
            $table->string('status')->nullable();
            $table->boolean('coups-coeur')->default(false);
            $table->timestamps();
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
