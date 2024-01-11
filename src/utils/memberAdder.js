import { menus } from "../constants";
import { CATEGORY_ID_GAME_FEE, ID_GAME_FEE_UNLIMITED } from "../constants";
import Member from "../Member";

export function memberAdder(currentId, setCurrentId, memberList, setMemberList) {
  let orderGameFeeUnlimited = {
    id: ID_GAME_FEE_UNLIMITED,
    name: "게임비(무제한)",
    cost: 5000,
    amount: 1
  };

  for (let category of menus) {
    if (category.id === CATEGORY_ID_GAME_FEE) {
      for (let item of category.items) {
        if (item.id === ID_GAME_FEE_UNLIMITED) {
          orderGameFeeUnlimited = {
            id: item.id,
            name: item.name,
            cost: item.cost,
            amount: 1
          };
          break;
        }
      }
      break;
    }
  }

  return (memberName) => {
    let newMember = new Member(currentId, memberName);
    newMember.orders.push(orderGameFeeUnlimited);
    setMemberList(memberList.concat(newMember));
    setCurrentId(currentId + 1);
  }
}
