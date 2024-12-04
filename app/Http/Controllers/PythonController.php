<?php

namespace App\Http\Controllers;

use App\Models\HouseHold;
use GuzzleHttp\Client;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\Process\Process;
use Symfony\Component\Process\ProcessUtils;

class PythonController extends Controller
{
    //
    public function all_households(Request $request)
    {

        // else {
        //     dd("unsuccessful");
        // }
        // $hh = HouseHold::get();
        // // dd($hh);
        // // dd($hh->toArray());
        // return $hh->toArray();
        // $apiUrl = 'http://hris.dvodeoro.local:91/api/ListOfEmployees4IPCR';
        $apiUrl = 'http://127.0.0.1:5000/api/households';
        // Initialize Guzzle HTTP client
        //$client = new Client();
        $data = [];
        try {
            // Initialize GuzzleHTTP client
            $client = new Client();

            // Make an HTTP POST request to the API URL
            $response = $client->get($apiUrl, [
                // If the API requires any specific data in the request body, you can add it here
                'form_params' => [
                    'key' => 'value',
                    // Add more parameters as needed
                ],
                // If the API requires headers or authentication, you can add them here
                'headers' => [
                    'Authorization' => 'Bearer YOUR_API_TOKEN', // Replace with your API token or credentials
                    // Add more headers if needed
                ],
            ]);

            // Get the JSON response from the API and decode it into an associative array
            $data = json_decode($response->getBody(), true);

            return $data;
        } catch (\Exception $e) {
            // Handle any errors that might occur during the API request
            dd($e);
            // return Inertia::render('ErrorView', [
            //     'message' => 'Failed to retrieve data from the API.',
            // ]);
        }
    }
}
