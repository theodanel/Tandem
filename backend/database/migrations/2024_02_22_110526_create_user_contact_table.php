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
        Schema::create('user_contact', function (Blueprint $table) {
            $table->foreignId('user_id_1')->constrained(table: 'users', column: 'id')->cascadeOnDelete();
            $table->foreignId('user_id_2')->constrained(table: 'users', column: 'id')->cascadeOnDelete();
            $table->primary(["user_id_1", "user_id_2"]);
            $table->timestamps();
        }); 
    }

    /**
     * Reverse the migrations. 
     */
    public function down(): void
    {
        Schema::dropIfExists('user_user');
    }
};
