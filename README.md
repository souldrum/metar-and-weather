# Metar And Weather

Hello, I'm [Souldrum](https://github.com/souldrum) and this is my little [Metar And Weather](https://souldrum.github.io/Metar_And_Weather/) app. **METAR** is an aviation meteorological code for transmitting actual weather reports at an aerodrome, which you can get if you enter the ICAO code of your airport in the appropriate field. This application is not a product for mass use, but you can try how it works. In addition to getting the METAR data, in the field below I have decoded some of the data, which allows you to use this application as a small weather resource. I think that fans of flight simulators and other people close to aviation will be able to figure out the interface without a manual, but if you are not familiar with such words as **METAR** and **ICAO**, then I will tell you what to do with it.

- Enter the ICAO code of your airport in the field

![icao](src/assets/img/readme/inputIcao.jpg)

- If you do not know what an icao code is and what the icao code of the airport you need is, then hover over the icon to the right of the input field and follow the link in the tooltip.

![icao-database](src/assets/img/readme/tooltip.jpg)

- On the [page](https://airportsbase.org/ICAO.php) that opens, find the country you need.

![select country](src/assets/img/readme/icaoPage.jpg)

- Then the city in which the airport you need is located.

![select city](src/assets/img/readme/icaoPageCity.jpg)

- After that, you will see all possible airports in the selected city and a table with the column we need.

![get icao](src/assets/img/readme/LFPG.jpg)

- For example, we are interested in the weather around Charles de Gaulle Airport in Paris. We enter its code in the input field, press the ENTER key and we get the METAR summary (top field) and the decoding of some METAR summary data (field below).

![enter icao](src/assets/img/readme/data.jpg)

### I hope this guide was helpful! I wish you all great weather!
