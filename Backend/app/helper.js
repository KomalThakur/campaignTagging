const moment = require('moment');
moment.suppressDeprecationWarnings = true;
// Function to find Quaterly dates and days for fixing 

function quarterly(effectiveDate, terminationDate) {
    var fixingdates = [];
    effectivedateqautertstart = moment(effectiveDate).startOf('quarter').format('MM-DD-YYYY');
    effectivedateqautertend = moment(effectiveDate).endOf('quarter').format('MM-DD-YYYY');
    fixingdate = effectivedateqautertend;

    // Current date Quarter Start and Quarter End
    currentdatequaterstart = moment(terminationDate).startOf('quarter').format('MM-DD-YYYY');
    currentdatequaterend = moment(terminationDate).endOf('quarter').format('MM-DD-YYYY');
    days = moment(effectivedateqautertend).diff(effectiveDate, 'days')

    fixingdates.push({ date: fixingdate, days });

    if (moment(effectivedateqautertend) < moment(currentdatequaterstart)) {
        var startDate = moment(effectivedateqautertend).add(1, 'days').format('MM-DD-YYYY');
        var startDateQuarterEnd = moment(startDate).endOf('quarter').format('MM-DD-YYYY');

        while (moment(startDateQuarterEnd) < moment(currentdatequaterstart)) {
            days = moment(startDateQuarterEnd).diff(startDate, 'days')
            fixingdate = startDateQuarterEnd
            fixingdates.push({ date: fixingdate, days });

            startDate = moment(startDateQuarterEnd).add(1, 'days').format('MM-DD-YYYY');
            startDateQuarterEnd = moment(startDate).endOf('quarter').format('MM-DD-YYYY');
        }
    }


    Enddate = moment(terminationDate).format('MM-DD-YYYY');
    days = moment(Enddate).diff(fixingdate, 'days')
    fixingdate = Enddate;
    fixingDateQuarterEnd = moment(fixingdate).endOf('quarter').format('MM-DD-YYYY');
    fixingdate = fixingDateQuarterEnd

    fixingdates.push({ date: fixingdate, days });
    return fixingdates;
}



// Function to find Semi-Annual dates for fixing

function semiAnnually(effectiveDate, terminationDate) {
    var fixingdates = [];
    effectivedate = moment(effectiveDate).format('MM-DD-YYYY');
    effectiveyear = moment(effectivedate).year();
    effectivemonth = moment(effectivedate).format('M');

    effectivedate = moment(effectivedate).date();
    if ((effectivedate <= 30) && (effectivemonth <= 6)) {
        firstfixingdate = new Date(effectiveyear, 5, 30)
        fixingdate = moment(firstfixingdate).format('MM-DD-YYYY');
        days = moment(firstfixingdate).diff(effectiveDate, 'days')
        fixingdates.push({ date: fixingdate, days });

    }
    else {
        firstfixingdate = new Date(effectiveyear, 11, 31)
        fixingdate = moment(firstfixingdate).format('MM-DD-YYYY');
        days = moment(firstfixingdate).diff(effectiveDate, 'days')
        fixingdates.push({ date: fixingdate, days });
    }

    //logic to find last fixing date
    currentdate = moment(terminationDate).format('MM-DD-YYYY');
    currentyear = moment(currentdate).year();
    currentmonth = moment(currentdate).format('M');
    currentdate1 = moment(currentdate).date();
    if ((currentdate1 <= 30) && (currentmonth <= 6)) {
        lastfixingdate = new Date((currentyear - 1), 11, 31)
        lastfixing = moment(lastfixingdate).format('MM-DD-YYYY');
    }

    else {
        lastfixingdate = new Date(currentyear, 5, 30)
        lastfixing = moment(lastfixingdate).format('MM-DD-YYYY');
    }


    if (moment(fixingdate) < moment(lastfixing)) {
        while (moment(fixingdate) < moment(lastfixing)) {
            var startDate = moment(fixingdate).add(1, 'days').format('MM-DD-YYYY');
            var startDateQuarterEnd = moment(startDate).endOf('quarter').format('MM-DD-YYYY');
            var startDate1 = moment(startDateQuarterEnd).add(1, 'days').format('MM-DD-YYYY');
            var startDateQuarterEnd1 = moment(startDate1).endOf('quarter').format('MM-DD-YYYY');
            days = moment(startDateQuarterEnd1).diff(fixingdate, 'days')
            fixingdate = startDateQuarterEnd1
            fixingdates.push({ date: fixingdate, days });
            

        }


    }

    Enddate = moment(terminationDate).format('MM-DD-YYYY');
    days = moment(Enddate).diff(fixingdate, 'days')
    fixingdate = Enddate;
    const quarter = moment(fixingdate).quarter(); // 2
    if (quarter === 2 || quarter === 4) {
        var lastfixing = moment(fixingdate).endOf('quarter').format('MM-DD-YYYY');
        fixingdate = lastfixing
        fixingdates.push({ date: fixingdate, days });
    }
    else {
        var lastfixing = moment(fixingdate).endOf('quarter').format('MM-DD-YYYY');
        var lastfixing1 = moment(lastfixing).add(1, 'days').format('MM-DD-YYYY');
        var lastfixing2 = moment(lastfixing1).endOf('quarter').format('MM-DD-YYYY');
        fixingdate = lastfixing2
        fixingdates.push({ date: fixingdate, days });
    }
    return fixingdates
}



function annually(effectiveDate, terminationDate) {
    var fixingdates = [];
    effectivedate = moment(effectiveDate).format('MM-DD-YYYY');
    effectiveyear = moment(effectivedate).year();
    effectivemonth = moment(effectivedate).format('M');
    effectivedate1 = moment(effectivedate).date();
    firstfixingdate = new Date(effectiveyear, 11, 31)
    fixingdate = moment(firstfixingdate).format('MM-DD-YYYY');
    days = moment(firstfixingdate).diff(effectivedate, 'days')
    fixingdates.push({ date: fixingdate, days });
    currentdate = moment(terminationDate).format('MM-DD-YYYY');
    currentyear = moment(currentdate).year();
    currentmonth = moment(currentdate).format('M');
    currentdate1 = moment(currentdate).date();
    currentyear1 = currentyear - 1;
    month = 32
    lastfixingdate = new Date(currentyear1, 11, 31)
    lastfixing = moment(lastfixingdate).format('MM-DD-YYYY');

    if (moment(fixingdate) < moment(lastfixing)) {
        while (moment(fixingdate) < moment(lastfixing)) {
            var startDate = moment(fixingdate).add(1, 'days').format('MM-DD-YYYY');
            var startDateQuarterEnd = moment(startDate).endOf('quarter').format('MM-DD-YYYY');
            var startDate1 = moment(startDateQuarterEnd).add(1, 'days').format('MM-DD-YYYY');
            var startDateQuarterEnd1 = moment(startDate1).endOf('quarter').format('MM-DD-YYYY');
            var startDate2 = moment(startDateQuarterEnd1).add(1, 'days').format('MM-DD-YYYY');
            var startDateQuarterEnd2 = moment(startDate2).endOf('quarter').format('MM-DD-YYYY');
            var startDate3 = moment(startDateQuarterEnd2).add(1, 'days').format('MM-DD-YYYY');
            var startDateQuarterEnd3 = moment(startDate3).endOf('quarter').format('MM-DD-YYYY');
            days = moment(startDateQuarterEnd3).diff(fixingdate, 'days')
            fixingdate = startDateQuarterEnd3
            fixingdates.push({ date: fixingdate, days });
        }
    }

    Enddate = moment(terminationDate).format('MM-DD-YYYY');
    days = moment(Enddate).diff(fixingdate, 'days')
    fixingdate = Enddate;
    const quarter = moment(fixingdate).quarter();
    lastyear = moment(fixingdate).year();
    fixingdate1 = new Date(lastyear, 11, 31);
    fixingdate = moment(fixingdate1).format('MM-DD-YYYY');
    fixingdates.push({ date: fixingdate, days });
    return fixingdates

}


function getFixingDates(effectiveDate, terminationDate, fixedFrequency) {

let query = [];

    //Effective date Quarter Start and Quarter End   

    if (fixedFrequency === "Quarterly") {
         query = quarterly(effectiveDate, terminationDate);
    }

    else if (fixedFrequency === "Semi-Annual") {
        query = semiAnnually(effectiveDate, terminationDate);
    }

    else if (fixedFrequency === "Annual") {
        query = annually(effectiveDate, terminationDate);
    }

    return query;

}

module.exports = {
    getFixingDates
}