<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Mail;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;

class VerifyMailJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $user, $redirectUrl, $email;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($user, $email, $redirectUrl = "#")
    {
        $this->user = $user;
        $this->email = $email;
        $this->redirectUrl = $redirectUrl;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Mail::to($this->user->email)->send($this->email);
    }
}
