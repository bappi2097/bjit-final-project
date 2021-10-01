<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;

class VerifyEmail extends Mailable
{
    use Queueable, SerializesModels;
    public $user, $redirectUrl, $token;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($user, $redirectUrl, $token)
    {
        $this->user = $user;
        $this->redirectUrl = $redirectUrl;
        $this->token = $token;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->view('mails.verify-email');
    }
}
