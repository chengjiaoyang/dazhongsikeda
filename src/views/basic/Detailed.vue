<template>
    <div>
        <div class="tables" style="background-color: #fff">
            <div class="head" style="font-size: 24px;text-align: center;height: 50px;line-height: 50px;">
                {{name}}
            </div>
        <div style="display: flex;">
			<div style="flex: 1; text-align:right">年度：{{year}}</div>
			<div style="flex: 1; margin-left:20px;">季度：{{season}}</div>
		</div>
        <table cellspacing="0" cellpadding="0" style="margin-top:10px;width: 100%;border: 1px solid #E5E5E5;">
            <thead>
				<tr style="height: 30px;line-height: 30px;background: #c1ffff; text-align: center;">
					<td style="width:15.3%;" class="bcb">检查类目</td>
					<td style="width: 23.2%;" class="bcb">检查内容</td>
					<td style="width: 6.7%;" class="bcb">权重</td>
					<td style="width: 16.5%;" class="bcb">判定条款</td>
					<td style="width: 11.8%" class="bcb">扣分(仅大众)</td>
					<td style="width: 9.9%;" class="bcb">可回溯(仅大众)</td>
					<td style="width: 16.3%;border-bottom: 1px solid #E5E5E5;">检查项说明</td>
				</tr>
			</thead>
            <tbody v-for="item in stateList" :key="item.id">
                <tr style="height: 40px;line-height: 40px;background: #E5E5E5;">
                    <td  colspan="7" style="text-indent:10px;">{{item.checkCategory}}</td>
                </tr>
				<tr v-for="items in item.templateDetailList" :key="items.id">
					<td style="width:15.3%;padding: 5px;" class="bcb">{{items.category}}</td>
					<td style="width: 23.2%; border-right: 1px solid #E5E5E5;border-bottom: 1px solid #E5E5E5; padding:5px;">{{items.checkContent}}</td>
					<td style="width: 6.7%;" class="bcb">{{items.weight}}</td>
					<td style="width: 16.5%; border-right: 1px solid #E5E5E5;border-bottom: 1px solid #E5E5E5;padding: 5px;">
                        <table>
                            <tr v-for="itam in items.templateCriterionList" :key="itam.id">
                                <td>{{itam.criterion}}</td>
                            </tr>
                        </table>
                    </td>
					<td style="width: 11.8%;" class="bcb">
                        <table style="width:100%;text-align: center;">
                            <tr v-for="itam in items.templateCriterionList" :key="itam.id" >
                                <td style="padding:6px;">{{itam.detailScore}}</td>
                            </tr>
                        </table>
                    </td>
					<td style="width: 9.9%;" class="bcb">{{items.isBack}}</td>
					<td style="width: 16.3%;text-align: center;border-bottom: 1px solid #E5E5E5;">{{items.itemDesc}}</td>
				</tr>
			</tbody>
        </table>    
        </div>
    </div>
   
</template>

<script>
    export default {
        data(){
            return {
                getDeta:{
                    id:"",
                    name:"",
                    year:"",
                    season:""
                },
                stateList:[],
                isShow:true,
            }
        },
        created () {
            this.getDetail();
        },
        methods:{
            //初始化数据
            getDetail() {
                var that = this;
                that.$axios
                .git("/vwhc/getTemplateDetail?ID=rowId")
                .then(res => {
                    if (res.data.success == true) {
                        that.stateList = res.data.data.templateFatherList;
                        that.name=res.data.data.name;
                        that.year=res.data.data.year;
                        that.season=res.data.data.season;
                    }
                 }) .catch(function(error) {
                    that.$message.error("请求出错");
                });
            }
        }

    }
</script>
<style scoped="scoped">
    * {
       list-style: none; 
    }
  
    .tables{
        width: 98%;
		margin-left: 1%;
		background: #FFFFFF;
		margin-top: 20px;
		margin-bottom: 20px;
		padding: 15px;
		border-radius: 10px;
		box-shadow: 5px 2px 10px #F2F2F2;
        letter-spacing:2px;
        line-height: 20px;
    }
    .bcb {
		text-align: center;
		border-right: 1px solid #E5E5E5;
		border-bottom: 1px solid #E5E5E5;
	}
	.bg1{
		background: #f2f2f2;
	}
</style>
