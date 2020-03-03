import { Pipe, PipeTransform, MissingTranslationStrategy } from '@angular/core';
import { EBADF } from 'constants';

@Pipe({
  name: 'filterBy'
})
export class FilterByPipe implements PipeTransform {

  transform(array: [], args?: any) {
    console.log("Filter pipe: ", array, " - ", args)
    if (array) {
      if (!args.property && !args.userItem) {
        console.log('1')
        return array;
      }
      if (args.property && args.userItem) {
        console.log('2')
        return array.filter(user => user[args.property] === args.userItem[args.property])
      }
      console.log('3')
      return array;
    }
  }

}

// kasaemo trikotaj kostum ydobno
// sl ifigyra pozvolaet eto krasivo
// pafos osobi jenskogo pola na EBADF, daleko do pafosa francyjeok
// y nas teplo tonkii sviterok

// posorilsi s doktorom s bytulkoi vinoi miritsa
// edit k podryjke tysit
// novui doktor v klinike
// 3 poceenta, vrach kyrator prikolno
// lubit dominirovat rykovodit
// doktor moi otdala na proteizirovana
// na shipela na nego
// za ego raboty
// 20 chelovek na prieme zavtra
// papa rabotaem v 1 kabinete
// chetverg 18 chelovek
// patnica do obeda tysit bydet ne asno gde
// xochetsa gylat iz za xoroshii pogodoi

// kak moi den 

// na ykraine boatsa govorit i testov nexrena net
// koronavirys est
// parij lyvre zakruli
// nedela modu znaet v parije otmenina
// xaipyut na etom v ykraine i vezde


// raskaju o sebe  
// obshsaemsa raz v sytki bydy rada teba poslyshat :)