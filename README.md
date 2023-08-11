# DataVisualizationProject

## Context 
According to the Burea of Transportation Services the transportation sector contributes 25% - 29% of greenhouse gas emissions in the United States. With the large movement of towards electric vehicles and other alternative fuel vehicles, it is important to get a good understanding of the energy landscape and the infrastructure in place to support the alternative fuels. Using this visualization we are able to investigate areas where infrastructure may be underdeveloped and other insights related to our energy adn transportation security.

## Instructions for the Web App:
Set Files:
Create a file called "config.js" inside the file path "static/js/config.js"
    Create a variable named "api_key" =  and store the key that is generated from the National Renewable Energy Laboratory website (https://developer.nrel.gov/signup/)
    This API will be used to populate our Cloud MongoDB as well as run the Leaflet map visualization. 

Extract data from the MongoDB 
    Follow the instructions in the "mongo_setup" file. They contain git commands to build a local database and collection . This collection can be exported as a complete JSON file and used to power JS files via d3 selection.

    Make sure the json file is named "fuel_stationDB.json" and that it is stored in the filepath "static/js/json/fuel_stationDB.json"

Now you are ready to run the Web App! 
    Navigate to "app.py"
    Open "app.py" in the integrated terminal and run the command "python app.py"
    This will reveal the URL needed to open the browser.
    You will be routed to the home page. Where it will instruct you on what routes you can append in the URL to navigate the web app.
        append "/index" to view the map
        append "/index2" to view the chart insights

Explore and enjoy!

