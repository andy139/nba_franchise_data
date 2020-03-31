let csv = `Franchise,Lg,From,To,Yrs,G,W,L,W/L%,Plyfs,Div,Conf,Championships,image_path,path,Franchise,,Valuation,Region,Subregion
Boston Celtics,NBA/BAA,1946-47,2019-20,74,5788,3421,2367,0.591,57,31,9,17,./images/,celtics.png,Boston Celtics,,3.2,east,Atlantic
Los Angeles Lakers,NBA/BAA,1948-49,2019-20,72,5678,3382,2296,0.596,61,32,18,16,./images/,lakers.png,Los Angeles Lakers,,4.4,west,Pacific
Chicago Bulls,NBA,1966-67,2019-20,54,4362,2227,2135,0.511,35,9,6,6,./images/,bulls.png,Chicago Bulls,,3.2,east,Central
Golden State Warriors,NBA/BAA,1946-47,2019-20,74,5785,2787,2998,0.482,35,12,6,6,./images/,warriors.png,Golden State Warriors,,4.3,west,Pacific
San Antonio Spurs,NBA/ABA,1967-68,2019-20,53,4285,2567,1718,0.599,47,22,6,5,./images/,spurs.png,San Antonio Spurs,,1.8,west,Southwest
Philadelphia 76ers,NBA,1949-50,2019-20,71,5615,2896,2719,0.516,49,11,5,3,./images/,sixers.png,Philadelphia 76ers,,2,east,Atlantic
Miami Heat,NBA,1988-89,2019-20,32,2559,1335,1224,0.522,20,13,5,3,./images/,heat.png,Miami Heat,,2,east,Southeast
Indiana Pacers,NBA/ABA,1967-68,2019-20,53,4286,2210,2076,0.516,35,9,1,3,./images/,pacers.png,Indiana Pacers,,1.5,east,Central
Detroit Pistons,NBA/BAA,1948-49,2019-20,72,5680,2753,2927,0.485,42,11,5,3,./images/,pistons.png,Detroit Pistons,,1.5,east,Central
Houston Rockets,NBA,1967-68,2019-20,53,4280,2265,2015,0.529,33,7,4,2,./images/,rockets.png,Houston Rockets,,2.5,west,Southwest
Brooklyn Nets,NBA/ABA,1967-68,2019-20,53,4286,1854,2432,0.433,27,5,2,2,./images/,nets.png,Brooklyn Nets,,2.5,east,Atlantic
New York Knicks,NBA/BAA,1946-47,2019-20,74,5787,2799,2988,0.484,42,8,4,2,./images/,knicks.png,New York Knicks,,4.6,east,Atlantic
Washington Wizards,NBA,1961-62,2019-20,59,4761,2152,2609,0.452,29,8,4,1,./images/,wizards.png,Washington Wizards,,1.8,east,Southeast
Toronto Raptors,NBA,1995-96,2019-20,25,1984,948,1036,0.478,12,6,1,1,./images/,raptors.png,Toronto Raptors,,2.1,east,Atlantic
Portland Trail Blazers,NBA,1970-71,2019-20,50,4036,2163,1873,0.536,35,6,3,1,./images/,blazers.png,Portland Trail Blazers,,1.9,west,Northwest
Oklahoma City Thunder,NBA,1967-68,2019-20,53,4280,2323,1957,0.543,31,11,4,1,./images/,thunder.png,Oklahoma City Thunder,,1.6,west,Northwest
Milwaukee Bucks,NBA,1968-69,2019-20,52,4199,2182,2017,0.52,32,14,2,1,./images/,bucks.png,Milwaukee Bucks,,1.6,east,Central
Dallas Mavericks,NBA,1980-81,2019-20,40,3217,1612,1605,0.501,21,3,2,1,./images/,mavericks.png,Dallas Mavericks,,2.4,west,Southwest
Cleveland Cavaliers,NBA,1970-71,2019-20,50,4035,1867,2168,0.463,22,7,5,1,./images/,cavaliers.png,Cleveland Cavaliers,,1.5,east,Central
Atlanta Hawks,NBA,1949-50,2019-20,71,5619,2766,2853,0.492,46,11,0,1,./images/,hawks.png,Atlanta Hawks,,1.5,east,Southeast
Sacramento Kings,NBA/BAA,1948-49,2019-20,72,5679,2590,3089,0.456,29,5,0,1,./images/,kings.png,Sacramento Kings,,1.8,west,Pacific
Utah Jazz,NBA,1974-75,2019-20,46,3706,2005,1701,0.541,28,9,2,0,./images/,jazz.png,Utah Jazz,,1.6,west,Northwest
Phoenix Suns,NBA,1968-69,2019-20,52,4199,2212,1987,0.527,29,6,2,0,./images/,suns.png,Phoenix Suns,,1.6,west,Pacific
Orlando Magic,NBA,1989-90,2019-20,31,2477,1188,1289,0.48,15,6,2,0,./images/,magic.png,Orlando Magic,,1.4,east,Southeast
New Orleans Pelicans,NBA,2002-03,2019-20,18,1442,671,771,0.465,7,1,0,0,./images/,pelicans.png,New Orleans Pelicans,,1.4,west,Southwest
Minnesota Timberwolves,NBA,1989-90,2019-20,31,2476,980,1496,0.396,9,1,0,0,./images/,timberwolves.png,Minnesota Timberwolves,,1.4,west,Northwest
Memphis Grizzlies,NBA,1995-96,2019-20,25,1985,824,1161,0.415,10,0,0,0,./images/,grizzlies.png,Memphis Grizzlies,,1.3,west,Southwest
Los Angeles Clippers,NBA,1970-71,2019-20,50,4034,1654,2380,0.41,14,2,0,0,./images/,clippers.png,Los Angeles Clippers,,2.6,west,Pacific
Charlotte Hornets,NBA,1988-89,2019-20,30,2395,1050,1345,0.438,10,0,0,0,./images/,hornets.png,Charlotte Hornets,,1.5,east,Southeast
Denver Nuggets,NBA/ABA,1967-68,2019-20,53,4287,2159,2128,0.504,34,11,0,0,./images/,nuggets.png,Denver Nuggets,,1.6,west,Northwest
NBA Logo,NBA/BAA,1946-47,2019-20,74,97304,61842,61360,0.496033333,896,31,9,77,./images/,nba.png,NBA Team,,64.1,,`



let data = d3.csvParse(csv);