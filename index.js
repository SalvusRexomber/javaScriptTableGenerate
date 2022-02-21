let tablazat, ujCella, ujSor;
let sortedArray = [];
let headerSorok = ['Filmcím', 'Eladott jegymennyiség', 'Típus (sorozat, film, kisfilm, stb.)', 'Egységár'];
let adatok = [
    {
        cim: 'Meghalni nincs idő',
        mennyiseg: '10',
        tipus: 'Film',
        egysegar: 4200

    },{
        cim: 'Apokalipszis most',
        mennyiseg: '50',
        tipus: 'Film',
        egysegar: 4300
    },{
        cim: 'A Kaspó',
        mennyiseg: '20',
        tipus: 'Kisfilm',
        egysegar: 2300
    },{
        cim: 'Walking Dead',
        mennyiseg: '15',
        tipus: 'Sorozat',
        egysegar: 1500
    }
];

tablazat = document.createElement('table');
tablazat.setAttribute("id", "tablazat");
    ujSor = document.createElement('tr');
        for(headerSor of headerSorok){
                ujCella = document.createElement('th');
                ujCella.setAttribute("id", "fejlec");
                ujCella.innerText = headerSor;
                tablazat.appendChild(ujCella);
            }
        
    tablazat.appendChild(ujSor);
 
    for(adat of adatok){
        ujSor = document.createElement('tr');
            for(index in adat){
                ujCella = document.createElement('td');
                ujCella.innerText = adat[index];
                ujCella.setAttribute("class", "ujCellaAdatok");
                ujSor.appendChild(ujCella);
            }
        tablazat.appendChild(ujSor);
    }


document.body.appendChild(tablazat);




let dokumentum = document.querySelector('#tablazat');

function szin(esemeny, elem){
    
    if(esemeny.type == 'click'){
        elem.style.backgroundColor = "green";

    }else if(esemeny.type == 'dblclick'){
        elem.style.backgroundColor = "red";
    }
}



function mukodik(esemeny, elem){
    setTimeout(rendez(esemeny, elem), 1000);
    setTimeout(szin(esemeny, elem), 1000);
}


function rendez(esemenyem, elem){
    document.querySelectorAll(".ujCellaAdatok").forEach(e => e.remove())
    document.querySelectorAll("tr").forEach(e => e.remove())



    sortedArray = adatok.sort(function(a, b) {
        if(esemenyem.type == 'click'){
            
                if(elem.innerText === "Filmcím"){
                    return a.cim.localeCompare(b.cim);
                }else if(elem.innerText === "Eladott jegymennyiség"){
                        if(parseInt(a.mennyiseg) > parseInt(b.mennyiseg)){
                            return 1;
                        }else if (parseInt(a.mennyiseg) < parseInt(b.mennyiseg)){
                            return -1;
                        }else{
                            return 0;
                        }
                }else if(elem.innerText === "Típus (sorozat, film, kisfilm, stb.)"){
                    return a.tipus.localeCompare(b.tipus);
                }else if(elem.innerText === "Egységár"){
                    if(a.egysegar > b.egysegar){
                        return 1;
                    }else if (a.egysegar < b.egysegar){
                        return -1;
                    }else{
                        return 0;
                    }
                }
        }
        else if(esemenyem.type == 'dblclick'){
            
                if(elem.innerText === "Filmcím"){
                    return b.cim.localeCompare(a.cim);
                }else if(elem.innerText === "Eladott jegymennyiség"){
                    if(parseInt(b.mennyiseg) > parseInt(a.mennyiseg)){
                        return 1;
                    }else if (parseInt(b.mennyiseg) < parseInt(a.mennyiseg)){
                        return -1;
                    }else{
                        return 0;
                    }
            }else if(elem.innerText === "Típus (sorozat, film, kisfilm, stb.)"){
                    return b.tipus.localeCompare(a.tipus);
                }else if(elem.innerText === "Egységár"){
                    if(b.egysegar > a.egysegar)
                    return 1;
                else if (b.egysegar < a.egysegar){
                    return -1;
                }else
                    return 0;
                }
        }
     });



     tablazat.appendChild(ujSor);
     for (adat of sortedArray){
        ujSor = document.createElement('tr');   
        for(index in adat){
            ujCella = document.createElement('td');
            ujCella.innerText = adat[index];
            ujCella.setAttribute("class", "ujCellaAdatok");
            ujSor.appendChild (ujCella);
        }
    tablazat.appendChild(ujSor);
     }
    }




function delegal(szulo, gyerek, mikor, mitCsinal){
    function esemenyKezelo(esemeny){
        let esemenyCelja = esemeny.target;
        let legkozelebbiIlyen = esemenyCelja.closest(gyerek);
        let meghivoElem = this;


        if(meghivoElem.contains(legkozelebbiIlyen)){
            mitCsinal(esemeny, legkozelebbiIlyen);
        }
    }

    szulo.addEventListener(mikor, esemenyKezelo);
}

delegal(dokumentum, '#fejlec', 'dblclick', mukodik);
delegal(dokumentum, '#fejlec', 'click', mukodik);
