var gas;
var temp;

function calculate() {
    temp = document.getElementById("temp").value;

    if (document.getElementById("o2").checked) {
        gas = document.getElementById("o2").value;
    }
    if (document.getElementById("air").checked) {
        gas = document.getElementById("air").value;
    }
    if (document.getElementById("co2").checked) {
        gas = document.getElementById("co2").value;
    }

    console.log(temp);
    console.log(gas);

    igas(gas, temp);
}

function Cp(r, iga, igb, igc, igd, ige, igf, t) {
    //Calculate Cp = constant pressure
    var cp = r * (iga + igb * t + igc * Math.pow(t, 2) + igd * Math.pow(t, 3) + ige * Math.pow(t, 4) + igf * Math.pow(t, 5));
    //Display result Cp
    console.log(cp);

    var div = document.getElementById("cp");
    div.textContent = "Cp: " + cp;
}

function h(r, iga, igb, igc, igd, ige, igf, kh, t) {
    //Calculate h = enthalpy
    var h = kh + r * (iga * t + (igb / 2) * Math.pow(t, 2) + (igc / 3) * Math.pow(t, 3) + (igd / 4) * Math.pow(t, 4) + (ige / 5) * Math.pow(t, 5) + (igf / 5) * Math.pow(t, 5));
    //Display result h
    console.log(h);

    var div = document.getElementById("h");
    div.textContent = "h: " + h;

    return h;
}

function u(r, hCalculated, t) {
    //Calculate u = internal energy
    var u = hCalculated - (r * t);
    //Display result u
    console.log(u);

    var div = document.getElementById("u");
    div.textContent = "u: " + u;

    return u;
}

function So(r, iga, igb, igc, igd, ige, igf, kso, t) {
    //Calculate So = entropy
    var so = kso + r * (iga * Math.log(t) + igb * t + (igc / 2) * Math.pow(t, 2) + (igd / 3) * Math.pow(t, 3) + (ige / 4) * Math.pow(t, 4) + (igf / 5) * Math.pow(t, 5));
    //Display result So
    console.log(so);

    var div = document.getElementById("So");
    div.textContent = "So: " + so;

    return so;
}

function Pr(soCalculated, r, kpr) {
    //Calculate Pr = change in pressure
    var pr = (Math.exp((soCalculated / r))) / kpr;
    //Display result So
    console.log(pr);

    var div = document.getElementById("Pr");
    div.textContent = "Pr: " + pr;

    return pr;
}

function Vr(r, t, prCalculated, kvr) {
    //Calculated Vr = volume
    var vr = kvr * ((r * t) / prCalculated);
    //Display result vr
    console.log(vr);

    var div = document.getElementById("Vr");
    div.textContent = "Vr: " + vr;
}

function igas(gas, temperature) {
    var hCalculated;
    var uCalculated;
    var soCalculated;
    var prCalculated;

    var mw = 0, iga, igb, igc, igd, ige, igf, kh, kso, kpr, kvr;
    if (gas == "O2") {
        //Assign
        mw = 32;
        iga = 3.626;
        igb = -0.001878;
        igc = 0.000007055;
        igd = -0.000000006764;
        ige = 0.000000000002156;
        igf = 0;
        //kh = -0.8776;
        //kso = -3;
        //kpr = 2000;
        //kvr = 1;
        kh = 0;
        kso = 0;
        kpr = 1;
        kvr = 1;
    }
    else if (gas == "Air") {
        //Assign
        mw = 28.97;
        iga = 3.653;
        igb = -0.001337;
        igc = 0.000003294;
        igd = -0.000000001913;
        ige = 0.0000000000002763;
        igf = 0;
        //kh = -4.48453;
        //kso = -4.200224;
        //kpr = 271.5932738;
        //kvr = 10;
        kh = 0;
        kso = 0;
        kpr = 1;
        kvr = 1;
    }
    else if (gas == "CO2") {
        //Assign
        mw = 44.01;
        iga = 2.401;
        igb = 0.008735;
        igc = -0.000006607;
        igd = -0.000000002002;
        ige = 0;
        igf = 0;
        //kh = -4.48453;
        //kso = -4.200224;
        //kpr = 271.5932738;
        //kvr = 10;
        kh = 0;
        kso = 0;
        kpr = 1;
        kvr = 1;
    }


    var r = 8.314 / mw;
    Cp(r, iga, igb, igc, igd, ige, igf, temperature);
    hCalculated = h(r, iga, igb, igc, igd, ige, igf, kh, temperature);
    uCalculated = u(r, hCalculated, temperature);
    soCalculated = So(r, iga, igb, igc, igd, ige, igf, kso, temperature);
    prCalculated = Pr(soCalculated, r, kpr);
    Vr(r, temperature, prCalculated, kvr);
}