<template>
  <div>
    <el-form :model="form" ref="loginForm" :rules="rules" :inline="false" size="normal" class="loginContainer">
      <h3 class="loginTitle">系统登陆</h3>

      <el-form-item prop="username">
        <el-input type="text" v-model.trim="form.username" placeholder="请输入用户名" autocomplete="false"></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model.trim="form.password" placeholder="请输入密码" autocomplete="false"></el-input>
      </el-form-item>

      <el-form-item prop="code">
        <el-input type="text" v-model.trim="form.code" placeholder="点击图片更换验证码" autocomplete="false" style="width: 250px; margin-right: 5px"></el-input>
        <img :src="captchaUrl" style="">
      </el-form-item>

      <el-checkbox v-model="checked" label="记住我" :indeterminate="false" class="rememberMe">记住我</el-checkbox>

      <el-button type="primary" @click="submitLogin" style="width: 100%">登录</el-button>
      

    </el-form>
    
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import { reactive, toRefs, ref } from '@vue/reactivity'

export default {
  name: "Login",
  setup() {
    const loginForm = ref(null)
    const state = reactive({
      captchaUrl: '',
      form: {
        username: 'admin',
        password: '',
        code: 'aiu3',
      },
      checked: true,
      // 校验规则
      rules: {
        username: [{required: true, message:'请输入用户名！', trigger: 'blur'}],
        password: [{required: true, message:'请输入密码！', trigger: 'blur'}],
        code: [{required: true, message:'请输入验证码！', trigger: 'blur'}]
      },
    })
    const submitLogin = () => {
      loginForm.value.validate((valid) => {
        if (valid) {
          ElMessage({
            showClose: true,
            message: '登录成功！',
            center: true,
            type: 'success',
          })
        } else {
          ElMessage({
            showClose: true,
            message: '请输入所有字段！',
            type: 'error',
            center: true,
          })
        }
      })
    }

    return {
      ...toRefs(state),
      loginForm,
      submitLogin,
    }
  }
}
</script>

<style>
  .loginContainer {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }
  .loginTitle {
    text-align: center;
  }
  .rememberMe {
    text-align: left;
    margin: 0 0 15px 0;
  }
</style>