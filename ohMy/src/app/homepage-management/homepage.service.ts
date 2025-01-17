import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {

  constructor(
    private apollo:Apollo
  ) { }

  getRecipesSpecial(paging:any){
    return this.apollo.watchQuery({
      query:gql`
      query GetAllRecipes($special: Boolean, $paging: Paging) {
        getAllRecipes(special: $special, paging: $paging) {
          _id
          available
          recipe_name
          status
          highlight
          special_offers
          image
          price
          count_result
        }
      }
      `, 
      variables:{
        "special": true,
        paging
      },
      fetchPolicy: "network-only"
    })
  }

  getRecipesHighlight(paging:any){
    console.log(paging);
    
    return this.apollo.watchQuery({
      query:gql`
      query GetAllRecipes($paging: Paging, $highlight: Boolean) {
        getAllRecipes(paging: $paging, highlight: $highlight) {
          _id
          available
          recipe_name
          status
          highlight
          special_offers
          image
          price
          count_result
        }
      }`, 
      variables:{
        highlight : true,
        paging
      },
      fetchPolicy: "network-only"
    })
  }


}
