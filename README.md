# Hacker Olympics entry puzzle solution

This is my crude solution to get into the 2013 [Hacker Olympics](http://thehackerolympics.com/).

## Usage

Generate a list of ips to test:

    python generate_ips.py > ip_list

Run the whole list to find the correct ip:

    python generate_ips.py | node find_correct_ip.js

Or if you want to run just the first 1000 ips:

    head -n 1000 ip_list | node find_correct_ip.js

Responses are written to files `postips` and `postresponses`.


### Requirements

* Python 2.7.3
* nodejs
        npm install request
