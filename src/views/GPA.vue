<template>
  <div class="gpa-container">
    <div class="gpa-form">
      <el-form :model="model">
        <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
        </el-form-item>
        <el-form-item label="成绩">
          <el-input v-model="model.score"></el-input>
        </el-form-item>
        <el-form-item label="学分">
          <el-input v-model="model.credit"></el-input>
        </el-form-item>
        <el-form-item label="是否补考">
          <el-checkbox v-model="model.isbu">补考</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gpa-list">
      <div class="gpa-row" v-for="(item, index) in scoreList" :key="index">
        <span>{{ item.name }}:</span>
        <span>{{ item.score }}:</span>
        <span>{{ item.credit }}:</span>
        <span>{{ item.isbu }}:</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'gpa',
  data() {
    return {
      model: {
        name: '',
        score: 0,
        gpa: 0,
        credit: 0,
        isbu: false,
      },
      scoreList: [
        {
          name: '',
          score: 0,
          gpa: 0,
          credit: 0,
          isbu: false,
        },
      ],
    }
  },
  methods: {
    computeGPA() {
      let sumCredit = 0
      let sumChengji = 0
      this.scoreList.map(score => {
        if (score.score <= 100 && score.score >= 90) {
          const comGPA = 4.0
          const chengji = comGPA * score.credit
          sumChengji += chengji
          sumCredit += score.credit
        } else if (score.score < 90 && score.score >= 85) {
          const comGPA = 3.7
          const chengji = comGPA * score.credit
          sumChengji += chengji
          sumCredit += score.credit
        } else if (score.score < 85 && score.score >= 81) {
          const comGPA = 3.3
          const chengji = comGPA * score.credit
          sumChengji += chengji
          sumCredit += score.credit
        } else if (score.score < 81 && score.score >= 78) {
          const comGPA = 3.0
          const chengji = comGPA * score.credit
          sumChengji += chengji
          sumCredit += score.credit
        } else if (score.score < 78 && score.score >= 75) {
          const comGPA = 2.7
          const chengji = comGPA * score.credit
          sumChengji += chengji
          sumCredit += score.credit
        } else if (score.score < 75 && score.score >= 71) {
          const comGPA = 2.3
          const chengji = comGPA * score.credit
          sumChengji += chengji
          sumCredit += score.credit
        } else if (score.score < 71 && score.score >= 68) {
          const comGPA = 2.0
          const chengji = comGPA * score.credit
          sumChengji += chengji
          sumCredit += score.credit
        } else if (score.score < 68 && score.score >= 64) {
          const comGPA = 1.7
          const chengji = comGPA * score.credit
          sumChengji += chengji
          sumCredit += score.credit
        } else if (score.score < 64 && score.score >= 60) {
          const comGPA = 1.0
          const chengji = comGPA * score.credit
          sumChengji += chengji
          sumCredit += score.credit
        } else if (score.score < 60) {
          const comGPA = 0
          const chengji = comGPA * score.credit
          sumChengji += chengji
          sumCredit += score.credit
        }
      })

      const gpa = sumChengji / sumCredit
      return gpa
    },
    onSubmit() {
      this.scoreList.push(this.model)
      this.model = {
        name: '',
        score: 0,
        gpa: 0,
        credit: 0,
        isbu: false,
      }
    },
  },
}
</script>

<style lang="scss" scoped></style>
