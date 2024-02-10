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
            $table->timestamp('date');
            $table->string('title');
            $table->text('description');
            $table->string('image');
            $table->foreignId('creator')->constrained(table: 'users', column: 'id')->cascadeOnDelete();
            $table->integer('collaborators');
            $table->integer('collaborators_max');
            $table->boolean('open');
            $table->foreignId('status')->constrained(table: 'statuses', column: 'id')->cascadeOnDelete();
            $table->integer('popularity');
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
