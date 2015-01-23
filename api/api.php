<?php 
header('Content-type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

$file = 'RSVP.json';
$params = array();
$parts = explode('/', $_SERVER['REQUEST_URI']);
$val = $parts[3];

$json = file_get_contents($file);

$str = (string)$json;
$json = json_decode($str);

if( $parts[2] == "rsvp"){
    if( $method == "GET"){
        if($val == ""){
            echo json_encode($json);
            return;
        }

        foreach($json->people as $item)
        {
            if($item->code == $val)
            {
                echo json_encode($item);
            }
        }
    }else if( $method == "PUT"){

        $put = array();
        parse_str(file_get_contents('php://input'), $put);
        
// or if you want to change all entries with activity_code "1"
        foreach($json->people as $item)
        {

            if($item->code == $put['RSVPcode'])
            {
                // echo 'yes! --> ' . $put['code'];

                foreach($item->family as $family){
                    if($family->id == $put['id']){
                        $family->response->attending = $put['RSVPevent'];
                        $family->response->food = $put['RSVPfood'];
                    }
                }
            }
        }

        file_put_contents('RSVP.json', json_encode($json));
        echo json_encode('{ "success": "true"}');
    }
}


if( $parts[2] == "stats"){
    if( $method == "GET"){
        $arr = array("responses" => array( "people" => 0, "adults" => 0, "children" => 0, "adults-remaining" => 0, "children-remaining" => 0, "people-remaining" => 0, "families" => 0, "families-remaining" => 0, "attending" => array("ceremony" => array("adults" => 0, "children" => 0, "all" => 0), "ceremony+reception" => array("adults" => 0, "children" => 0, "all" => 0)),"declined" => array("adults" => 0, "children" => 0, "all" => 0)), "food" => array("fish" => 0, "beef" => 0, "vegetarian" => 0));
        foreach($json->people as $people){
            foreach($people->family as $family){
                $familyHasRSVPd = false;
                

                //they have responded 
                if($family->response->attending != null){
                    $familyHasRSVPd = true;
                    $arr["responses"]["people"]++;
                    if($family->status == "adult"){
                        $arr["responses"]["adults"]++;
                    }
                    if($family->status == "child"){
                        $arr["responses"]["children"]++;
                    }
                    

                    //they are attending just the ceremony
                    if($family->response->attending == "ceremony"){
                            //all
                        $arr["responses"]["attending"]["ceremony"]["all"]++;
                            //adults
                        if($family->status =="adult"){
                            $arr["responses"]["attending"]["ceremony"]["adults"]++;
                            //kids
                        }elseif($family->status =="child"){
                            $arr["responses"]["attending"]["ceremony"]["children"]++;
                        }
                    //they are attending both ceremony and reception
                    }elseif($family->response->attending == "ceremony+reception"){
                        $arr["responses"]["attending"]["ceremony+reception"]["all"]++;
                            //adults
                        if($family->status =="adult"){
                            $arr["responses"]["attending"]["ceremony+reception"]["adults"]++;
                            //kids
                        }elseif($family->status =="child"){
                            $arr["responses"]["attending"]["ceremony+reception"]["children"]++;
                        }

                        //beef
                        if($family->response->food == "beef"){
                            $arr["food"]["beef"]++;
                        //fish
                        }elseif($family->response->food == "fish"){
                            $arr["food"]["fish"]++;
                        }elseif($family->response->food == "vegetarian"){
                            $arr["food"]["vegetarian"]++;
                        }
                    //they declined    
                    }elseif( $family->response->attending == "no"){
                        $arr["responses"]["declined"]["all"]++;
                            //adults
                        if($family->status =="adult"){
                            $arr["responses"]["declined"]["adults"]++;
                            //kids
                        }elseif($family->status =="child"){
                            $arr["responses"]["declined"]["children"]++;
                        }
                    }
                }else{
                    $arr["responses"]["people-remaining"]++;
                    if($family->status == "adult"){
                        $arr["responses"]["adults-remaining"]++;
                    }
                    if($family->status == "child"){
                        $arr["responses"]["children-remaining"]++;
                    }
                }
                
            }
            if($familyHasRSVPd == true){
                $arr["responses"]["families"]++;
            }else{
                $arr["responses"]["families-remaining"]++;
            }
        }
        echo json_encode($arr);
    }

}elseif( $parts[3] == "both"){
    if( $method == "GET"){
        $count = 0;
        foreach($json->people as $people){
            foreach($people->family as $family){
                foreach($family->response as $response){
                    if($response == "ceremony+reception"){
                        $count++;
                    }
                }
            }
        }
        echo json_encode('{ "wedding": "'.$count.'"}.');
    }
}


?>