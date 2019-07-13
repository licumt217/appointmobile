class Calculation{
	static getQuestionScore(measure,relation,keyValue,waitMeasure){
		var self=this
		for(let i=0;i<measure["list"].length;i++){
			if(measure["list"][i]["type"]=="3"){
				measure["list"][i]["value"]=self.childrenQuestionScore(measure["list"][i])
			}
		}
		var jumpId=self.jumpMeasure(measure,relation,keyValue,waitMeasure)
		return jumpId
	}
	static jumpMeasure(measure,relation,keyValue,waitMeasure){
		var self=this
		var jumpId
		var measureId=measure["id"]
		var question=measure["list"]
		var index=keyValue[measureId]
		//如果是量表组 根据量表规则跳转
		if(index["listIndex"]||index["listIndex"]=="0"){
			var jumprule=relation[index["index"]]["tableList"][index["listIndex"]]["jumpRules"]
			//如果有跳转规则
			if(jumprule&&jumprule.length>0){
				var measureObj=self.tokeyValue(question)
				jumpId=self.jumpRule(jumprule,measureObj,waitMeasure)
				//如果没有跳转量表
				if(!jumpId&&jumpId!="0"){
					//如果没有跳转量表查看等候量表
					jumpId=self.getWaitMeausre(relation,index,waitMeasure)
				}
			}else{
				//如果没有跳转量表查看等候量表
				jumpId=self.getWaitMeausre(relation,index,waitMeasure)
			}
		}else{
			//没有跳转规则 的下一个量表
			if(index["index"]<relation.length-1){
				var next=parseInt(index["index"])+1
				jumpId=self.isRelationGrup(relation,next)
			}
		}
		return jumpId
	}
	static getWaitMeausre(relation,index,waitMeasure){
		var self=this
		var jumpId
		//当有等待量表的时候先查找等待量表
		if(waitMeasure&&waitMeasure.length>0){
			jumpId=waitMeasure[0]
			waitMeasure.shift()
		}else{
			//当没有等候量表的时候
			if(index["index"]<relation.length-1){
				var next=parseInt(index["index"])+1
				jumpId=self.isRelationGrup(relation,next)
			}
		}
		return jumpId
	}
	static isRelationGrup(relation,index){
		var jumpId
		if(relation[index]["tableList"]&&relation[index]["tableList"].length>0){
			jumpId=relation[index]["tableList"][0]["tableId"]
		}else{
			jumpId=relation[index]["tableId"]
		}
		return jumpId
	}
	static jumpRule(rules,measure,waitMeasure){
		var self=this
		var jumpId
		var jumpMeausres=[]
		for(let i=0;i<rules.length;i++){
			var rule=rules[i]
			var isjumpflag=self.isJump(rule,measure)
			if(isjumpflag){
				jumpMeausres.push(rule["tableId"])
			}
		}
		if(jumpMeausres&&jumpMeausres.length>0){
			jumpId=jumpMeausres[0]
			jumpMeausres.shift()
			// var newwaitMeasure=waitMeasure.concat(jumpMeausres)
			// waitMeasure=newwaitMeasure

			jumpMeausres.forEach((item)=>{
				waitMeasure.push(item)
			})


		}
		return jumpId
	}
	static isJump(rule,measure){
		var operator={"and":"&&","or":"||"}
		var flag=false
		for(let i=0;i<rule["items"].length;i++){
			var currentFlag=eval(measure[rule["items"][i]]["value"]+rule["operator"]+rule["value"])
			if(i==0){
				flag=currentFlag
			}else{
				flag=eval(flag+operator[rule["logicOperator"]]+currentFlag)
			}
		}
		return flag
	}
	static tokeyValue(measure){
		var obj={}
		for(let i=0;i<measure.length;i++){
			obj[measure[i]["id"]]=measure[i]
		}
		return obj
	}
	static childrenQuestionScore(children){
		var lastScore
		var rule=children["rule"]
		if(rule){
			rule=JSON.parse(rule)
		}
		if(children["children"]&&children["children"].length>0){
			var questionScore=[]
			for(let i=0;i<children["children"].length;i++){
				var score=children["children"][i]["value"]
				if(score||score=="0"){
					if(rule){
						if(eval(score+rule["questionType"]+rule['ruleValue'])){
							questionScore.push(score)
						}
					}else{
						if(questionScore[0]){
							questionScore[0]=questionScore[0]+score
						}else{
							questionScore[0]=score
						}
					}
				}
			}
			if(rule){
				if(questionScore.length>=parseInt(rule["questionNum"])){
					lastScore=rule["realValue"]
				}else{
					lastScore=rule["falseValue"]
				}
			}else{
				lastScore=questionScore[0]
			}

		}
		return lastScore
	}
}
export {Calculation}
