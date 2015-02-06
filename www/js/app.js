var mobile = mobile || {};

mobile.panelHead = jQuery("#panel-head");
mobile.panelSub = jQuery("#panel-sub");
mobile.arrPanelData = jQuery(".panel-data");
mobile.dataCharts = jQuery(".data-charts");
mobile.dataListItems = jQuery(".data-list").find("li");
mobile.panelWrap = jQuery(".panel-wrap");
mobile.dataWrap = jQuery(".data-wrap");
mobile.stateMenu = jQuery(".state-menu");
mobile.arrDataText = jQuery(".data-text");
mobile.arrDataNumbers = jQuery(".data-number");
mobile.arrPies = jQuery(".pie-box");
mobile.dataContainer = jQuery(".data-container");
mobile.chatterBox = jQuery(".mobile-company-info-box");
mobile.arrStateText = [
    "Use the search section above to find your school.",
    "Use the search section above to find your school.",
    "Use the search section above to find your school.",
    "Use the search section above to find your school.",
    "Use the search section above to find your school.",
    "Use the search section above to find your school.",
    "Illinois’ data includes all students K-12.",
    "Massachusetts’ Medical Exemption rate includes both medical and religious exemptions. In Massachusetts, data for schools with fewer than 30 kindergartners has been redacted.",
    "Minnesota’s Medical Exemption rate includes both medical and conscientious objections.",
    "Use the search section above to find your school.",
    "New York’s data includes all students K-12. The MMR rate references the percentage of students who specifically have been vaccinated for measles.",
    "Use the search section above to find your school.",
    "In Virginia, the location of each school refers to the state health district.",
    "Vermont’s data includes all students K-12.",
    "Use the search section above to find your school.",
    "Use the search section above to find your school.",
    "In West Virginia, data for schools with fewer than 30 kindergartners has been redacted."
];


mobile.currentFocus = null;

mobile.blnSmallScrn = false;

if ($(window).width() < 800) {
    mobile.blnSmallScrn = true;
}

mobile.setPanelInfo = function (data) {


    if (data === null) {
        mobile.panelHead.empty();
        mobile.panelSub.empty();
        mobile.dataCharts.removeClass("show");
        mobile.arrPanelData.eq(0).addClass("hidden");
        mobile.dataListItems.empty();
    }

    else {
        mobile.panelWrap.eq(0).show();
        mobile.dataCharts.addClass("show");

        mobile.panelHead.text(data.Name);


        //mobile.panelSub.text(data.City + ", " + data.State);
        mobile.panelSub.show();
        mobile.drawChart(data);
        mobile.renderTable(data);

    }
};

mobile.renderTable = function (prop) {
    var numParam;
    var strHTML = "";
    strHTML += '<table class="data-table" cellspacing="0" cellpadding="0" border="0">';
    strHTML += '    <tr>';
    strHTML += '        <td>Measles, Mumps, Rubella</td>';
    numParam = prop.MMR;
    if (isNaN(numParam) || (numParam === "")) {
        strHTML += '        <td>NA</td>';
    } else {
        strHTML += '        <td>' + (Math.round(numParam * 10000) / 100).toString() + '%</td>';
    }
    strHTML += '    </tr>';
    strHTML += '    <tr>';
    strHTML += '        <td>Diphtheria, Tetanus, Pertussis</td>';
    numParam = prop.DTaP;
    if (isNaN(numParam) || (numParam === "")) {
        strHTML += '        <td>NA</td>';
    } else {
        strHTML += '        <td>' + (Math.round(numParam * 10000) / 100).toString() + '%</td>';
    }
    strHTML += '    </tr>';
    strHTML += '    <tr>';
    strHTML += '        <td>Polio</td>';
    numParam = prop.Polio;
    if (isNaN(numParam) || (numParam === "")) {
        strHTML += '        <td>NA</td>';
    } else {
        strHTML += '        <td>' + (Math.round(numParam * 10000) / 100).toString() + '%</td>';
    }
    strHTML += '    </tr>';
    strHTML += '    <tr>';
    strHTML += '        <td>Hepatitis B</td>';
    numParam = prop.HepB;
    if (isNaN(numParam) || (numParam === "")) {
        strHTML += '        <td>NA</td>';
    } else {
        strHTML += '        <td>' + (Math.round(numParam * 10000) / 100).toString() + '%</td>';
    }
    strHTML += '    </tr>';
    strHTML += '    <tr>';
    strHTML += '        <td>Varicella</td>';
    numParam = prop.Varicella;
    if (isNaN(numParam) || (numParam === "")) {
        strHTML += '        <td>NA</td>';
    } else {
        strHTML += '        <td>' + (Math.round(numParam * 10000) / 100).toString() + '%</td>';
    }
    strHTML += '    </tr>';
    strHTML += '    <tr>';
    strHTML += '        <td>Medical Exemptions</td>';
    numParam = prop.Medical;
    if (isNaN(numParam) || (numParam === "")) {
        strHTML += '        <td>NA</td>';
    } else {
        strHTML += '        <td>' + (Math.round(numParam * 10000) / 100).toString() + '%</td>';
    }
    strHTML += '    </tr>';
    strHTML += '    <tr>';
    strHTML += '        <td>Philosophical Exemptions</td>';
    numParam = prop.Philosophical;
    if (isNaN(numParam) || (numParam === "")) {
        strHTML += '        <td>NA</td>';
    } else {
        strHTML += '        <td>' + (Math.round(numParam * 10000) / 100).toString() + '%</td>';
    }
    strHTML += '    </tr>';
    strHTML += '    <tr>';
    strHTML += '        <td>Religious Exemptions</td>';
    numParam = prop.Religious;
    if (isNaN(numParam) || (numParam === "")) {
        strHTML += '        <td>NA</td>';
    } else {
        strHTML += '        <td>' + (Math.round(numParam * 10000) / 100).toString() + '%</td>';
    }
    strHTML += '    </tr>';
    strHTML += '    <tr>';
    strHTML += '        <td>Missing Records</td>';
    numParam = prop.NoRecords;
    if (isNaN(numParam) || (numParam === "")) {
        strHTML += '        <td>NA</td>';
    } else {
        strHTML += '        <td>' + (Math.round(numParam * 10000) / 100).toString() + '%</td>';
    }
    strHTML += '    </tr>';
    strHTML += '</table>';
    mobile.dataContainer.html(strHTML);
};

mobile.getSimilarCounties = function (data) {

    var keys = ["F", "S", "T", "F2", "F3"];
    var matches = [];
    for (var i = 0; i < keys.length; i++) {
        var fips = data[keys[i]];
        var match = mobile.lookup(mobile.data, "FIPS", fips);


        matches.push(match);
    }

    mobile.renderSimilarCounties(matches);


};

mobile.renderSimilarCounties = function (arrayCounties) {

    var $countyList = $(".county-list");

    $countyList.empty();

    for (var i = 0; i < arrayCounties.length; i++) {
        var county = arrayCounties[i];

        var itemTemplate = "<li class='county-item' data-fips='" + county.FIPS + "'>" + county.CTY + ", " + county.ST + "</li>";

        $countyList.eq(0).append(itemTemplate);


    }

    $(".county-item").on("click", function () {
        Analytics.click("Related County Clicked");
        var $this = $(this);
        var fips = $this.data("fips");
        var newCounty = mobile.lookup(mobile.data, "FIPS", fips);
        mobile.setPanelInfo(newCounty);
        window.scrollTo(0, 0);

    });


};

mobile.calcPercent = function (num) {
    return Math.round(num * 1000) / 10 + "%";
};

mobile.numberWithCommas = function (x) {
    if (!x) {
        return "";
    }
    else {
        var parts = x.toString().split(".");
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return parts.join(".");
    }
};

mobile.drawChart = function (prop) {

    if (prop !== null) {
        //drawing pie charts
        var numComplete = prop.Complete;
        var numEnroll = parseInt(prop.Enrollment);
        if (isNaN(numEnroll)) {
            mobile.arrDataNumbers.eq(0).html("NA");
        } else {
            mobile.arrDataNumbers.eq(0).html(mobile.numberWithCommas(numEnroll));
        }
        if (isNaN(numComplete) || (numComplete === "")) {
            numComplete = -1;
            mobile.arrDataNumbers.eq(1).html("NA");
        } else {
            numComplete = Math.round(prop.Complete * 10000) / 100;
            mobile.arrDataNumbers.eq(1).html(numComplete.toString() + "<span class=\"small_pct\">%</span>");
        }

        var arrRace = [];
        arrRace[0] = [
            {"label": "Complete", "value": numComplete},
            {"label": "Incomplete", "value": 100 - numComplete}
        ];
        $el = $(".data-charts");

        var w = mobile.arrPies.eq(0).width();
        var h = w;
        var r = w / 2;
        mobile.arrPies.height(h);
        $el.height(h);
        mobile.arrPies.empty();
        var data = [];
        var vis, pie, arc, arcs;
        var color = d3.scale.ordinal().range(["#156283", "#ffffff"]);
        if (numComplete !== -1) {
            jQuery.each(arrRace, function (index) {

                data = arrRace[index];

                vis = d3.select('#pie' + index.toString()).append("svg:svg").data([data]).attr("width", w).attr("height", h).append("svg:g").attr("transform", "translate(" + r + "," + r + ")");
                pie = d3.layout.pie().value(function (d) {
                    return d.value;
                });

                // declare an arc generator function
                arc = d3.svg.arc().outerRadius(r);

                // select paths, use arc generator to draw
                arcs = vis.selectAll("g.slice").data(pie).enter().append("svg:g").attr("class", "slice");
                arcs.append("svg:path")
                    .attr("fill", function (d, i) {
                        return color(i);
                    })
                    .attr("d", function (d) {

                        return arc(d);
                    });

            });
            mobile.arrPies.removeClass("hide");
        } else {
            mobile.arrPies.addClass("hide");
        }

    }


};


mobile.calcExtent = function (array1, array2, key) {


    var min = d3.min([d3.min(array1, function (d) {
        return d[key];
    }), d3.min(array2, function (d) {
        return d[key];
    })]);


    var max = d3.max([d3.max(array1, function (d) {
        return d[key];
    }), d3.max(array2, function (d) {
        return d[key];
    })]);

    return [min, max];
};


mobile.lookup = function (array, key, value) {
    var result = _.find(array, function (entry) {
        return entry[key] == value;
    });


    return result;
};


mobile.listen = function () {

    $(window).on("resize", function () {
        mobile.drawChart(mobile.currentFocus);
    });


};


$(document).ready(function () {

    var blnIframeEmbed = window != window.parent;

    if (blnIframeEmbed) {
        $("body").addClass("iFrame");
        $("#header").hide();
        $(".mobile-footer-link").hide();
        $(".article-button").hide();
    }

    mobile.listen();
    mobile.panelWrap.eq(0).hide();
    window.setTimeout(function () {
        $(".preloader-mobile").eq(0).fadeOut(500);
    }, 1000);
});

(function () {

    var searchApp = angular.module('dataSearch', [])
        .config([
            '$compileProvider',
            function ($compileProvider) {
                $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|javascript):/);
            }
        ]);
    searchApp.controller('SearchController', function ($http, $scope, $filter) {

        $scope.companies = [];
        $scope.stateOptions = [
            {state: "State"},
            {state: "AR"},
            {state: "AZ"},
            {state: "CA"},
            {state: "FL"},
            {state: "GA"},
            {state: "ID"},
            {state: "IL"},
            {state: "MA"},
            {state: "MN"},
            {state: "NC"},
            {state: "NY"},
            {state: "RI"},
            {state: "VA"},
            {state: "VT"},
            {state: "WA"},
            {state: "WI"},
            {state: "WV"}
        ];
        $scope.stateItem = {
            states: $scope.stateOptions[0]
        };

        this.loadStateData = function () {
            mobile.panelWrap.eq(0).hide();
            if (mobile.stateMenu.eq(0).children("option:selected").index() > 0) {
                mobile.chatterBox.html(mobile.arrStateText[mobile.stateMenu.eq(0).children("option:selected").index() - 1]);
                $http.get("js/data/" + mobile.stateMenu.eq(0).children("option:selected").text().toLowerCase() + ".json").then(function (data) {
                    mobile.data = data.data;
                    $scope.data = data.data;
                });
            } else {
                mobile.chatterBox.html("Use the search section above to find your school.");
            }
            mobile.chatterBox.show();
        };

        this.checkMenu = function () {
            if (mobile.stateMenu.val() != "0") {
                return true;
            } else {
                return false;
            }
        };

        this.blur = function () {
            $scope.filterTerm = "";
        };

        this.setFocus = function (focusItem) {
            Analytics.click("School selected");
            mobile.currentFocus = focusItem;
            mobile.setPanelInfo(focusItem);
            $scope.isFormOpen = false;


            //set the filter term to be the full company name of the company selected
            // $scope.filterTerm = company.name;
            $scope.filterTerm = "";


            jQuery(window).on("resetSearch", function () {
                $scope.filterTerm = "";

                mobile.searchCont.find("input").val("");
            });
            $scope.setShare(focusItem);

        };


        this.clear = function () {
            $scope.filterTerm = "";
            mobile.setPanelInfo(null);
        };

        this.mobileSearch = function () {
            Analytics.click("Typed in search box");
            mobile.panelWrap.eq(0).hide();

            $scope.filteredArray = $filter("filter")($scope.data, $scope.filterTerm, false);
            if ($scope.filteredArray.length > 400) {
                $scope.filteredArray.length = 0;
            }
            if ($scope.filteredArray.length === 0) {
                mobile.chatterBox.show();
            } else {
                mobile.chatterBox.hide();
            }

            if ($scope.filterTerm !== "") {
                mobile.currentFocus = null;
                $scope.isFormOpen = true;
            }
            else {
                $scope.isFormOpen = false;
                mobile.chatterBox.show();
            }
        };

        $scope.showShare = function () {
            $(".panel-inner-wrap").addClass("blur");
            $(".share-page").addClass("show");
        };

        $scope.hideShare = function () {
            $(".panel-inner-wrap").removeClass("blur");
            $(".share-page").removeClass("show");
        };

        $scope.showInfo = function () {
            $(".panel-inner-wrap").addClass("blur");
            $(".info-page").addClass("show");
        };

        $scope.hideInfo = function () {
            $(".panel-inner-wrap").removeClass("blur");
            $(".info-page").removeClass("show");
        };

        $scope.setShare = function (schoolObj) {
            var copy,
                encodedURL,
                encodedURL2,
                encodedStr,
                encodedStrTE;

            var encodedBaseURL = encodeURIComponent("http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/");

            if (schoolObj) {
                copy = "My school, " + schoolObj.Name + " in " + schoolObj.City + ", " + schoolObj.State + ",  has a complete vaccination rate of " + (Math.round(schoolObj.Complete * 10000) / 100).toString() + ". Look up your school.";
                encodedURL = encodeURIComponent("http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/index.html");
                encodedURL2 = encodeURI("http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/index.html");
                encodedStr = encodeURIComponent(copy);
                encodedStr = encodeURI(encodedStr);
                encodedStrTE = encodeURIComponent(copy);
            }

            else {
                copy = "How vaccinated are your local schools? Look up their rates @USATODAY";
                encodedURL = encodeURIComponent("http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/index.html");
                encodedURL2 = encodeURI("http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/index.html");
                encodedStr = encodeURIComponent(copy);
                encodedStr = encodeURI(encodedStr);
                encodedStrTE = encodeURIComponent(copy);
            }

            var encodedTitle = encodeURIComponent("School Vaccination Rate");
            var fbRedirectUrl = encodeURIComponent("http://www.gannett-cdn.com/usatoday/_common/_dialogs/fb-share-done.html");

            var tweetUrl = "https://twitter.com/intent/tweet?url=" + encodedURL + "&text=" + encodedStrTE + "";

            var fbUrl = "javascript: var sTop=window.screen.height/2-(218);var sLeft=window.screen.width/2-(313);window.open('https://www.facebook.com/dialog/feed?display=popup&app_id=215046668549694&link=" + encodedURL2 + "&picture=http://www.gannett-cdn.com/experiments/usatoday/2015/02/measles/img/fb-share.jpg&name=" + encodedTitle + "&description=" + encodedStr + "&redirect_uri=http://www.gannett-cdn.com/experiments/usatoday/_common/_dialogs/fb-share-done.html','sharer','toolbar=0,status=0,width=580,height=400,top='+sTop+',left='+sLeft);Analytics.click('Facebook share');void(0);";


            var emailURL = "mailto:?body=" + encodedStrTE + "%0d%0d" + encodedURL + "&subject=" + encodedTitle;

            $scope.share = {
                copy: copy,
                tweetUrl: tweetUrl,
                fbUrl: fbUrl,
                emailURL: emailURL
            };
        };
        $scope.setShare(null);
    });


})();

