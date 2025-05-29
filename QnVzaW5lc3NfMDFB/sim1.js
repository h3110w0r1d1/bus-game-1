class GameOverview{
  constructor(goal){
    this.turn=0;
    this.business={};
    this.goal=goal;
    this.difficulty=-1;
  }
  advanceTime(am,n){
  if(!n){this.turn+=am;}
    
  }
  createBusiness(name, money, employees, departments, needs, outs, id,difficulty){
    this.difficulty=difficulty;
    return this.business=new Business(name, money, employees, departments, needs, outs, id);
  }
  updateProgression(){
    return 100*(this.business.value/this.goal);
  }
}
function TimeController(){
  A.business.money-=A.business.employees.total();
  if(A.goal<= A.business.money){alert('won');}
  A.business.employees.EmployeeMoralCalc();
  A.advanceTime(1,false);
  
}
class Business{
  constructor(name, money, employees, departments, needs, outs,id){
    this.id=id;
    this.value=money;
    this.money=money;
    this.name=name;
    this.employees=employees;
    this.departments=departments;
    this.needs=needs;
    this.outs=outs;
    
  }
}
class owner{
  constructor(share){this.share=share;}
}
class EmployeeManager{
  constructor(employees,managers, senior_managers,vice_director,director,vice_president,president,minor_executive,major_executive,Owner,board,chairman,payScale,diff){
   if(isNaN(parseInt(employees))||isNaN(parseInt(managers))||isNaN(parseInt(senior_managers))||isNaN(parseInt(vice_director))||isNaN(parseInt(director))||isNaN(parseInt(vice_president))||isNaN(parseInt(president))||isNaN(parseInt(minor_executive))||isNaN(parseInt(diff))||isNaN(parseInt(major_executive))||isNaN(parseInt(board))||isNaN(parseInt(chairman))){alert('Unrecoverable Error: EmpMan_EA_nV_0001A'); throw new Error('some value(s) is/are not (a) number(s)!');} if(parseInt(employees)<0||parseInt(managers)<0||parseInt(senior_managers)<0||parseInt(vice_director)<0||parseInt(director)<0||parseInt(vice_president)<0||parseInt(president)<0||parseInt(minor_executive)<0||parseInt(major_executive)<0||Owner.length<1||parseInt(board)<0||parseInt(chairman)<0){alert('Unrecoverable Error: EmpMan_EA_nV_0001B'); throw new Error('some value is not positive!');}if(!(payScale instanceof Array)){alert('Unrecoverable Error: EmpMan_EA_nV_0002A');throw new Error('payScale is not an Array!');}if(payScale.length!==12){alert('Unrecoverable Error: EmpMan_EA_nV_0002B'); throw new Error('payScale is incorrect');}this.employees=parseInt(employees);this.managers=parseInt(managers);this.srManagers=parseInt(senior_managers);this.viceDirectors=parseInt(vice_director);this.directors=parseInt(director);this.vicePresidents=parseInt(vice_president);this.presidents=parseInt(president);this.minExecutive=parseInt(minor_executive);this.majExecutive=parseInt(major_executive);this.owner=Owner;this.boardMembers=parseInt(board);this.chairmen=parseInt(chairman);
   //*************************************************************************************************************************************************
if (parseInt(diff) > 3 || parseInt(diff) < 1) {
  alert('unknown difficulty');
  throw new Error('incorrect difficulty for employee manager.');
}
this.dV=parseInt(diff);
 for(let i=0;i<12;i++){
   if(payScale[i]<17){ alert("Pay must be greater than $17/hour!");payScale[i]=17;}
  }
    this.employeePay=0; this.managerPay=0; this.srManagerPay=0;
        this.viceDirectorPay=0; this.directorPay=0;this.vicePresidentPay=0;
        this.presidentPay=0; this.minorExecutivePay=0; this.majorExecutivePay=0;
        this.ownerPay=0; this.boardMembersPay=0; this.chairmenPay=0;
   this.payScale=payScale;
  this.morale=(50*this.dV);
  this.employeePay=parseInt(payScale[0])*this.employees;
  this.managerPay=parseInt(payScale[1])*this.managers;
  this.srManagerPay=parseInt(payScale[2])*this.srManagers;
  this.viceDirectorPay=parseInt(payScale[3])*this.viceDirectors;
  this.directorPay=parseInt(payScale[4])*this.directors;
  this.vicePresidentPay=parseInt(payScale[5])*this.vicePresidents;
  this.presidentPay=parseInt(payScale[6])*this.presidents;
  this.minorExecutivePay=parseInt(payScale[7])*this.minExecutive;
  this.majorExecutivePay=parseInt(payScale[8])*this.majExecutive;
 this.ownerPay=0;
 for(let i=0;i<this.owner.length;i++){this.ownerPay+=parseInt(payScale[9])*parseInt(this.owner[i].share)}
 this.boardMembersPay=this.boardMembers*payScale[10];
this.chairmenPay= parseInt(payScale[11])*parseInt(chairman);
this.morale=100;
//*******//
this.productivityTotal=0;
this.employeeProductivity=0;
this.managerProductivity=0;
this.srmanagerProductivity=0;
this.vicedirectorProductivity=0;
this.directorProductivity=0;
this.vicepresidentProductivity=0;
this.presidentProductivity=0;
this.minorexecutiveProductivity=0;
this.majorexecutiveProductivity=0;
this.boardProductivity=0;
this.chairProductivity=0;
}
EmployeeTaxDetermine() {
    const hccpe = [.04, .07, .0355]; // Healthcare cost per difficulty (easiest is highest index)
    const dV = this.dV;
    const maxDV = 3; // Max difficulty level

    const groups = [
        [this.employeePay, this.employees],
        [this.managerPay, this.managers],
        [this.srManagerPay, this.srManagers],
        [this.viceDirectorPay, this.viceDirectors],
        [this.directorPay, this.directors],
        [this.vicePresidentPay, this.vicePresidents],
        [this.presidentPay, this.presidents],
        [this.minorExecutivePay, this.minExecutive],
        [this.majorExecutivePay, this.majExecutive],
        [this.ownerPay, this.owner.length],
        [this.boardMembersPay, this.boardMembers],
        [this.chairmenPay, this.chairmen]
    ];

    const result = [];

    for (let i = 0; i < groups.length; i++) {
        const [totalPay, count] = groups[i];
        const grossPay = count > 0 ? totalPay / count : 0;

        let tax = 0;
        let retirement = 0;
        // Healthcare cost indexed by difficulty, higher difficulty = higher cost
        let healthcare = hccpe[dV - 1];
        // Living cost decreases with higher difficulty (harder difficulty = higher living cost)
        let living = 1775.5 + ((maxDV - dV) * 150);

        if (isNaN(grossPay)) {
            result.push(0);
            continue;
        }

        if (grossPay <= 0) {
            tax = 0.10 + ((0.05 +(i/100))* (maxDV - dV));       // Higher tax on harder difficulty
            retirement = 0.05 + ((0.05+(i/100)) * (maxDV - dV)); // Higher retirement on harder difficulty
            const deductions = tax + retirement + healthcare;
            const netPay = grossPay * (1 - deductions);
            const finalAnnual = netPay - living;
            const totalGroupIncome = finalAnnual * count;
            result.push(Number(totalGroupIncome.toFixed(2)));
            continue;
        }

        // Adjust deduction brackets to scale up with difficulty inversely
        if (grossPay <= (10000/365)) {
            tax = 0.10 + 0.05 * (maxDV - dV);
            retirement = 0.07 + 0.025 * (maxDV - dV);
        } else if (grossPay <= (40000/365)) {
            tax = 0.15 + 0.05 * (maxDV - dV);
            retirement = 0.1 + 0.03 * (maxDV - dV);
            living -= 300;
        } else if (grossPay <= (80000/365)) {
            tax = 0.18 + 0.05 * (maxDV - dV);
            retirement = 0.11 + 0.02 * (maxDV - dV);
            living -= 400;
        } else if (grossPay <= (110000/365)) {
            tax = 0.22 + 0.05 * (maxDV - dV);
            retirement = 0.125 + 0.03 * (maxDV - dV);
            living -= 500;
        } else {
            tax = 0.25 + 0.1 * (maxDV - dV);
            retirement = 0.15 + 0.04 * (maxDV - dV);
            living = 2100 + ((maxDV - dV) * 600);
        }

        const deductions = tax + retirement + healthcare;
        const netAnnual = grossPay * (1 - deductions) - (living/365);
        const totalGroupIncome = netAnnual * count;

        result.push(Number(totalGroupIncome.toFixed(2)));
    }

    return result;
}
 EmployeeMoralCalc(){
      let XXX = [
        [this.employeePay, this.employees],
        [this.managerPay, this.managers],
        [this.srManagerPay, this.srManagers],
        [this.viceDirectorPay, this.viceDirectors],
        [this.directorPay, this.directors],
        [this.vicePresidentPay, this.vicePresidents],
        [this.presidentPay, this.presidents],
        [this.minorExecutivePay, this.minExecutive],
        [this.majorExecutivePay, this.majExecutive],
        [this.ownerPay, this.owner.length],
        [this.boardMembersPay, this.boardMembers],
        [this.chairmenPay, this.chairmen]
    ];
  let pay=this.EmployeeTaxDetermine()

  let mA=[];
  for(let i=0;i<pay.length;i++){
    pay[i];
    if(pay[i]<=0){
        this.morale-=Math.abs(pay[i]) * (i + 1) * (2 * (4 - this.dV));
    }if(pay[i]>Math.abs(7*i+1)*parseFloat(XXX[i][2])){
         this.morale+= (pay[i] - Math.abs(7*i+1)*parseFloat(XXX[i][2])) * Math.abs(7 * i + 1) * (0.0015 * (4 - this.dV));
    }
  }
  return  this.morale
}
EmployeeMoralCalcSP(ind){
      let XXX = [
        [this.employeePay, this.employees],
        [this.managerPay, this.managers],
        [this.srManagerPay, this.srManagers],
        [this.viceDirectorPay, this.viceDirectors],
        [this.directorPay, this.directors],
        [this.vicePresidentPay, this.vicePresidents],
        [this.presidentPay, this.presidents],
        [this.minorExecutivePay, this.minExecutive],
        [this.majorExecutivePay, this.majExecutive],
        [this.ownerPay, this.owner.length],
        [this.boardMembersPay, this.boardMembers],
        [this.chairmenPay, this.chairmen]
    ];
  let pay=this.EmployeeTaxDetermine()

  let mA=[];
 
    pay[ind];
    if(pay[ind]<=0){
      this.morale-=Math.abs(pay[ind]) * (ind + 1) * (2 * (4 - this.dV));
    }if(pay[ind]>Math.abs(7*ind+1)*parseFloat(XXX[ind][2])){
         this.morale+= (pay[ind] - Math.abs(7*ind+1)*parseFloat(XXX[ind][2])) * Math.abs(7 * ind + 1) * (0.0015 * (4 - this.dV));
    }
  
  return   this.morale;
}
total(){
  return this.employeePay+this.managerPay+this.srManagerPay+this.viceDirectorPay+this.directorPay+this.vicePresidentPay+this.presidentPay+this.minorExecutivePay+this.majorExecutivePay+this.ownerPay+this.boardMembersPay;
}
EmTotal(){
  return this.employees +this.managers+this.srManagers+this.viceDirectors+this.directors+this.vicePresidents+this.presidents+this.minExecutive+this.majExecutive+this.owner.length+this.boardMembers;
}


}
//**************************************************************************************************************************************************************//
class Need{
  constructor(id,amountn,amountm,reason,price,er,met){
    this.met=met;
    this.id=id;
    this.amountNeed=amountn;
    this.amountMet=amountm;
    this.reason=reason;
    this.price=price;
    this.er=String(er);
  }
 changeAmountMet(q){
   return this.amountMet+=q;
 }
  changeAmountNeed(q){
   return this.amountNeed+=q;
 }
  alertErr(){
   return alert(this.er);
 }
}
class Output extends Need{
  constructor(id,need,met,reason,price,er,out){
    super(id,need,met,reason,price,er,true);
    this.out=out;
  }
}


