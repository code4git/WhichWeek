app.controller('AppCtrl', function($scope, $state, $window, $ionicSlideBoxDelegate) {
    
    if($window.StatusBar) {
        $scope.statusBar = StatusBar.hide();
    }
 
    // start variables for Week Counter
    var startDatein,
        endDatein,
        sundayCountry = {"pt-BR":"pr-BR", "es-419":"es-419", "en-US":"en-US", "en-us":"en-us", "ja":"ja", "ja-JP":"ja-JP", "fr-ca":"fr-ca", "es-ar":"es-ar","es-bo":"es-bo","es-ve":"es-ve","es-gt":"es-gt","es-hn":"es-hn","es-do":"es-do","es-co":"es-co","es-cr":"es-cr","es-mx":"es-mx","es-pa":"es-pa","es-ni":"es-ni","es-py":"es-py","es-pe":"es-pe","es-pr":"es-pr","es-sv":"es-sv","es-uy":"es-uy","es-cl":"es-cl","es-ec":"es-ec","zh":"zh","zh-hk":"zh-hk","zh-CN":"zh-CN","zh-sg":"zh-sg","zh-TW":"zh-TW","vi":"vi"},
        monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        countryforWeek = navigator.language,
        WeekStartDate,
        WeekEndDate,
        day;
    
    $scope.date;

    // function for week counting
    $scope.weekCounter =  function (a) {
      
      var checkDate = new Date(); // current date on user device
      checkDate.setDate(checkDate.getDate() + a); // set date for current slide
      var firstJan = new Date(checkDate.getFullYear(),0,1); // set first January of current date year
      var dayOfWeekYear; //the day of week the year begins on
      var weeknum; //variable for week num
      var dayOfYear = Math.floor((checkDate.getTime() - firstJan.getTime() - (checkDate.getTimezoneOffset()-firstJan.getTimezoneOffset())*60000)/86400000) + 1; //get current day number
      day = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() + 7); // get current date for showing

      //check start day of week by country
      if (countryforWeek in sundayCountry) {
        startDatein = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() - checkDate.getDay()); //set start day of the week
        endDatein = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() - checkDate.getDay()+6); //set end day of the week
        dayOfWeekYear = firstJan.getDay() - 0; 
        dayOfWeekYear = (dayOfWeekYear >= 0 ? dayOfWeekYear : dayOfWeekYear + 7);
    
        //if the year starts before the middle of a week
        if(dayOfWeekYear <= 4) {
  
          weeknum = Math.floor((dayOfYear+dayOfWeekYear-1)/7) + 1;

          if(weeknum > 52 || weeknum == 0) {

            nYear = new Date(checkDate.getFullYear() + 1,0,1);
            nday = nYear.getDay() - 0;
            nday = nday >= 0 ? nday : nday + 7;
            
            weeknum = nday <= 4 ? 1 : 53; 
            //if the next year starts before the middle of the week, it is week #1 of that year
          }
        } else {
          weeknum = Math.floor((dayOfYear+dayOfWeekYear-1)/7);
        }
      } else {
        dayOfWeekYear = firstJan.getDay() - 1;
        dayOfWeekYear = (dayOfWeekYear >= 0 ? dayOfWeekYear : dayOfWeekYear + 7);
        if (checkDate.getDay() == 0) {
          startDatein = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() - checkDate.getDay()-6);
          endDatein = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() - checkDate.getDay());
        } else {
            startDatein = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() - checkDate.getDay()+1);
          endDatein = new Date(checkDate.getFullYear(), checkDate.getMonth(), checkDate.getDate() - checkDate.getDay()+7);
        }
     
        //if the year starts before the middle of a week
        if(dayOfWeekYear < 4) {
          
        weeknum = Math.floor((dayOfYear+dayOfWeekYear-1)/7) + 1;
          
          if(weeknum > 52) {
            nYear = new Date(checkDate.getFullYear() + 1,0,1);
            nday = nYear.getDay() - 1;
            nday = nday >= 0 ? nday : nday + 7;
          
            weeknum = nday < 4 ? 1 : 53; //if the next year starts before the middle of the week, it is week #1 of that year
          }
        } else {
          weeknum = Math.floor((dayOfYear+dayOfWeekYear-1)/7);
        }
      }
       
      var WeekStartDate = new Date(startDatein.getFullYear(), startDatein.getMonth(), startDatein.getDate());
      var WeekEndDate = new Date(endDatein.getFullYear(), endDatein.getMonth(), endDatein.getDate());

      $scope.day = getLocaleShortDateString(day, true); //show day in local format
      $scope.weekPeriod = getLocaleShortDateString(WeekStartDate, false) + " - " + getLocaleShortDateString(WeekEndDate, false); //show Week Period in local format

      if (weeknum == 0) {
        weeknum = 53;
      }
      
      return weeknum;
    
    }

    //get Date in Local Date Formate
    function getLocaleShortDateString(d, needyear) {
      var f={"ar-SA":"dd/MM/yy","bg-BG":"dd.MM.yyyy","ca-ES":"dd/MM/yyyy","zh-TW":"yyyy/MM/d","zh":"yyyy/MM/d","cs-CZ":"d.MM.yyyy","da-DK":"dd-MM-yyyy", "da":"dd-MM-yyyy","de-DE":"dd.MM.yyyy","de-de":"dd.MM.yyyy","de":"dd.MM.yyyy","el-GR":"d/MM/yyyy", "el":"d/MM/yyyy","en-US":"d/MM/yyyy","fi-FI":"d.MM.yyyy", "fi":"d.MM.yyyy", "fr-FR":"dd/MM/yyyy","fr":"dd/MM/yyyy","he-IL":"dd/MM/yyyy","hu-HU":"yyyy. MM. dd.","is-IS":"d.MM.yyyy","it-IT":"dd/MM/yyyy","it":"dd/MM/yyyy","ja-JP":"yyyy/MM/dd","ja":"yyyy/MM/dd","ko-KR":"yyyy-MM-dd","nl-NL":"d-MM-yyyy","nl":"d-MM-yyyy","nb-NO":"dd.MM.yyyy","pl-PL":"yyyy-MM-dd","pt-BR":"d/MM/yyyy","ro-RO":"dd.MM.yyyy","ru-RU":"dd.MM.yyyy","ru":"dd.MM.yyyy","hr-HR":"d.MM.yyyy","sk-SK":"d. MM. yyyy","sq-AL":"yyyy-MM-dd","sv-SE":"yyyy-MM-dd","sv":"yyyy-MM-dd","th-TH":"d/MM/yyyy","tr-TR":"dd.MM.yyyy", "tr":"dd.MM.yyyy","ur-PK":"dd/MM/yyyy","id-ID":"dd/MM/yyyy","uk-UA":"dd.MM.yyyy","uk":"dd.MM.yyyy","be-BY":"dd.MM.yyyy", "be":"dd.MM.yyyy","sl-SI":"d.MM.yyyy","et-EE":"d.MM.yyyy","lv-LV":"yyyy.MM.dd.","lt-LT":"yyyy.MM.dd","fa-IR":"MM/dd/yyyy","vi-VN":"dd/MM/yyyy","hy-AM":"dd.MM.yyyy","az-Latn-AZ":"dd.MM.yyyy","az":"dd.MM.yyyy","eu-ES":"yyyy/MM/dd","mk-MK":"dd.MM.yyyy", "mk":"dd.MM.yyyy","af-ZA":"yyyy/MM/dd","af":"yyyy/MM/dd","ka-GE":"dd.MM.yyyy","fo-FO":"dd-MM-yyyy","hi-IN":"dd-MM-yyyy","ms-MY":"dd/MM/yyyy","kk-KZ":"dd.MM.yyyy","ky-KG":"dd.MM.yy","sw-KE":"MM/d/yyyy","uz-Latn-UZ":"dd/MM yyyy","tt-RU":"dd.MM.yyyy","pa-IN":"dd-MM-yy","gu-IN":"dd-MM-yy","ta-IN":"dd-MM-yyyy","te-IN":"dd-MM-yy","kn-IN":"dd-MM-yy","mr-IN":"dd-MM-yyyy","sa-IN":"dd-MM-yyyy","mn-MN":"yy.MM.dd","gl-ES":"dd/MM/yy","kok-IN":"dd-MM-yyyy","syr-SY":"dd/MM/yyyy","dv-MV":"dd/MM/yy","ar-IQ":"dd/MM/yyyy", "ar":"dd/MM/yyyy","zh-CN":"yyyy/MM/d","de-CH":"dd.MM.yyyy","en-GB":"dd/MM/yyyy","es-MX":"dd/MM/yyyy","fr-BE":"d/MM/yyyy","it-CH":"dd.MM.yyyy","nl-BE":"d/MM/yyyy","nn-NO":"dd.MM.yyyy","pt-PT":"dd-MM-yyyy","sr-Latn-CS":"d.MM.yyyy","sv-FI":"d.MM.yyyy","az-Cyrl-AZ":"dd.MM.yyyy","ms-BN":"dd/MM/yyyy","uz-Cyrl-UZ":"dd.MM.yyyy","ar-EG":"dd/MM/yyyy","zh-HK":"d/MM/yyyy","de-AT":"dd.MM.yyyy","en-AU":"d/MM/yyyy","es-ES":"dd/MM/yyyy", "es":"dd/MM/yyyy","fr-CA":"yyyy-MM-dd","sr-Cyrl-CS":"d.MM.yyyy","ar-LY":"dd/MM/yyyy","zh-SG":"d/MM/yyyy","de-LU":"dd.MM.yyyy","en-CA":"dd/MM/yyyy","es-GT":"dd/MM/yyyy","fr-CH":"dd.MM.yyyy","ar-DZ":"dd-MM-yyyy","zh-MO":"d/MM/yyyy","de-LI":"dd.MM.yyyy","en-NZ":"d/MM/yyyy","es-CR":"dd/MM/yyyy","fr-LU":"dd/MM/yyyy","ar-MA":"dd-MM-yyyy","en-IE":"dd/MM/yyyy","es-PA":"MM/dd/yyyy","fr-MC":"dd/MM/yyyy","ar-TN":"dd-MM-yyyy","en-ZA":"yyyy/MM/dd","es-DO":"dd/MM/yyyy","ar-OM":"dd/MM/yyyy","en-JM":"dd/MM/yyyy","es-VE":"dd/MM/yyyy","ar-YE":"dd/MM/yyyy","en-029":"MM/dd/yyyy","es-CO":"dd/MM/yyyy","ar-SY":"dd/MM/yyyy","en-BZ":"dd/MM/yyyy","es-PE":"dd/MM/yyyy","ar-JO":"dd/MM/yyyy","en-TT":"dd/MM/yyyy","es-AR":"dd/MM/yyyy","ar-LB":"dd/MM/yyyy","en-ZW":"MM/d/yyyy","es-EC":"dd/MM/yyyy","ar-KW":"dd/MM/yyyy","en-PH":"MM/d/yyyy","es-CL":"dd-MM-yyyy","ar-AE":"dd/MM/yyyy","es-UY":"dd/MM/yyyy","ar-BH":"dd/MM/yyyy","es-PY":"dd/MM/yyyy","ar-QA":"dd/MM/yyyy","es-BO":"dd/MM/yyyy","es-SV":"dd/MM/yyyy","es-HN":"dd/MM/yyyy","es-NI":"dd/MM/yyyy","es-PR":"dd/MM/yyyy","am-ET":"d/MM/yyyy","tzm-Latn-DZ":"dd-MM-yyyy","iu-Latn-CA":"d/MM/yyyy","sma-NO":"dd.MM.yyyy","mn-Mong-CN":"yyyy/MM/d","gd-GB":"dd/MM/yyyy","en-MY":"d/MM/yyyy","prs-AF":"dd/MM/yy","bn-BD":"dd-MM-yy","wo-SN":"dd/MM/yyyy","rw-RW":"MM/d/yyyy","qut-GT":"dd/MM/yyyy","sah-RU":"MM.dd.yyyy","gsw-FR":"dd/MM/yyyy","co-FR":"dd/MM/yyyy","oc-FR":"dd/MM/yyyy","mi-NZ":"dd/MM/yyyy","ga-IE":"dd/MM/yyyy","se-SE":"yyyy-MM-dd","br-FR":"dd/MM/yyyy","smn-FI":"d.MM.yyyy","moh-CA":"MM/d/yyyy","arn-CL":"dd-MM-yyyy","ii-CN":"yyyy/MM/d","dsb-DE":"d. MM. yyyy","ig-NG":"d/MM/yyyy","kl-GL":"dd-MM-yyyy","lb-LU":"dd/MM/yyyy","ba-RU":"dd.MM.yy","nso-ZA":"yyyy/MM/dd","quz-BO":"dd/MM/yyyy","yo-NG":"d/MM/yyyy","ha-Latn-NG":"d/MM/yyyy","fil-PH":"MM/d/yyyy","ps-AF":"dd/MM/yy","fy-NL":"d-MM-yyyy","ne-NP":"MM/d/yyyy","se-NO":"dd.MM.yyyy","iu-Cans-CA":"d/MM/yyyy","sr-Latn-RS":"d.MM.yyyy","si-LK":"yyyy-MM-dd","sr-Cyrl-RS":"d.MM.yyyy","lo-LA":"dd/MM/yyyy","km-KH":"yyyy-MM-dd","cy-GB":"dd/MM/yyyy","bo-CN":"yyyy/MM/d","sms-FI":"d.MM.yyyy","as-IN":"dd-MM-yyyy","ml-IN":"dd-MM-yy","en-IN":"dd-MM-yyyy","or-IN":"dd-MM-yy","bn-IN":"dd-MM-yy","tk-TM":"dd.MM.yy","bs-Latn-BA":"d.MM.yyyy","mt-MT":"dd/MM/yyyy","sr-Cyrl-ME":"d.MM.yyyy","se-FI":"d.MM.yyyy","zu-ZA":"yyyy/MM/dd","xh-ZA":"yyyy/MM/dd","tn-ZA":"yyyy/MM/dd","hsb-DE":"d. MM. yyyy","bs-Cyrl-BA":"d.MM.yyyy","tg-Cyrl-TJ":"dd.MM.yy","sr-Latn-BA":"d.MM.yyyy","smj-NO":"dd.MM.yyyy","rm-CH":"dd/MM/yyyy","smj-SE":"yyyy-MM-dd","quz-EC":"dd/MM/yyyy","quz-PE":"dd/MM/yyyy","hr-BA":"d.MM.yyyy.","sr-Latn-ME":"d.MM.yyyy","sma-SE":"yyyy-MM-dd","en-SG":"d/MM/yyyy","ug-CN":"yyyy-MM-d","sr-Cyrl-BA":"d.MM.yyyy","es-US":"MM/d/yyyy"};
      var l=navigator.language?navigator.language:navigator['userLanguage'],y=d.getFullYear(),m=monthName[d.getMonth()];dayd=d.getDate();
      f=(l in f)?f[l]:"MM/dd/yyyy";

      function z(s){s=''+s;return s.length>1?s:'0'+s;}
        if (needyear==true) {
          f=f.replace(/yyyy/,y);f=f.replace(/yy/,String(y).substr(2));
          f=f.replace(/MM/,m);
          f=f.replace(/dd/,z(dayd));f=f.replace(/d/,dayd);
          return f;
        } else {
          f=f.replace(/yyyy/,String(y).substr(5));f=f.replace(/yy/,String(y).substr(5));
          f=f.replace(/MM/,m);
          f=f.replace(/dd/,z(dayd));f=f.replace(/d/,dayd);
        f.toString();
        
          var testforslesh = f.indexOf("/");
          if (testforslesh == 0) {
            return f.slice(1);
          } else {
          return f.slice(0,-1);
        }
       }
    }

    // function for slide creating
    var makeSlide = function ( nr, data ) {
      return angular.extend( data, {
        nr : nr
      });
    };
  
    var default_slides_indexes = [ -1, 0, 1 ], //slide array
        default_slides = [
          makeSlide( default_slides_indexes[ 0 ], {
            title : 'previous week'
          }),
          makeSlide( default_slides_indexes[ 1 ], {
            title : 'current week'
          }),
          makeSlide( default_slides_indexes[ 2 ], {
            title : 'next week'
          })
        ],
        direction = 0; //direction of sliding
    $scope.slides = angular.copy( default_slides );
    $scope.selectedSlide = 1; // initial

    // function for slide changed event
    $scope.slideChanged = function ( i ) {
      var previous_index = i === 0 ? 2 : i - 1,
          next_index     = i === 2 ? 0 : i + 1,
          new_direction  = $scope.slides[ i ].nr > $scope.slides[ previous_index ].nr ? 1 : -1;

      angular.copy(
        createSlideData( new_direction, direction ),
        $scope.slides[ new_direction > 0 ? next_index : previous_index ]
      );
      
      direction = new_direction;
    };
    
    // detecting where new slide will be added - before first/after last
    var head = $scope.slides[ 0 ].nr,
        tail = $scope.slides[ $scope.slides.length - 1 ].nr;

    // creating and adding new slides
    var createSlideData = function ( new_direction, old_direction ) {
      var nr;

      if ( new_direction === 1 ) {
        tail = old_direction < 0 ? head + 3 : tail + 1;  
      }
      else {
        head = old_direction > 0 ? tail - 3 : head - 1;
      }

      nr = new_direction === 1 ? tail : head;
      if ( default_slides_indexes.indexOf( nr ) !== -1 ) {
        return default_slides[ default_slides_indexes.indexOf( nr ) ];
      };
      return makeSlide( nr, {
        title : 'week'
      });
    };

});