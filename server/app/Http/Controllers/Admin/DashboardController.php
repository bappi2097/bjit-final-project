<?php

namespace App\Http\Controllers\Admin;

use App\BlogComment;
use App\BlogPost;
use App\Http\Controllers\Controller;
use App\Section;
use App\Traits\ApiResponseWithHttpStatus;
use App\User;
use App\Website;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DashboardController extends Controller
{
    use ApiResponseWithHttpStatus;
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getDashboardInfo()
    {
        $users = User::select('id', 'created_at')
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('m'); // grouping by months
            });

        $websites = Website::select('id', 'created_at')
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('m'); // grouping by months
            });

        $blogPosts = BlogPost::select('id', 'created_at')
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('m'); // grouping by months
            });

        $comments = BlogComment::select('id', 'created_at')
            ->get()
            ->groupBy(function ($date) {
                return Carbon::parse($date->created_at)->format('m'); // grouping by months
            });

        $usermcount = [];
        $websitemcount = [];
        $blogpostcount = [];
        $commentcount = [];
        $data = [];

        foreach ($users as $key => $value) {
            $usermcount[(int)$key] = count($value);
        }

        foreach ($websites as $key => $value) {
            $websitemcount[(int)$key] = count($value);
        }


        foreach ($blogPosts as $key => $value) {
            $blogpostcount[(int)$key] = count($value);
        }
        foreach ($comments as $key => $value) {
            $commentcount[(int)$key] = count($value);
        }

        for ($i = 1; $i <= 12; $i++) {
            $data["areachart"][] = [
                "month" => date('M', mktime(0, 0, 0, $i, 10)),
                "registered" => !empty($usermcount[$i]) ? $usermcount[$i] : 0,
                "website" => !empty($websitemcount[$i]) ? $websitemcount[$i] : 0
            ];
            $data["blogchart"][] = [
                "month" => date('M', mktime(0, 0, 0, $i, 10)),
                "Registered" => !empty($usermcount[$i]) ? $usermcount[$i] : 0,
                "Post" => !empty($blogpostcount[$i]) ? $blogpostcount[$i] : 0,
                "Comment" => !empty($commentcount[$i]) ? $commentcount[$i] : 0
            ];
        }
        $data["no_of_users"] = User::count();
        $data["no_of_websites"] = Website::count();
        $data["no_of_sections"] = Section::count();
        $data["website_percentage"] = (Website::count() / (User::count() ? User::count() : 1)) * 100;

        return $this->apiResponse("Dashboard data fetched", $data, Response::HTTP_OK, true);
    }
}
