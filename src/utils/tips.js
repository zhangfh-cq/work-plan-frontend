// 挂载到Vue原型上的Notify成功提示
export async function successNotify(operate) {
  await this.$notify({
    type: 'success',
    title: '成功',
    message: `${operate}成功`
  });
}

// 挂载到Vue原型上的Notify失败提示
export async function errorNotify(response, operate) {
  await this.$notify({
    type: 'error',
    title: '失败',
    message: response ? response.msg : `${operate}失败`
  });
}

// 挂载到Vue原型上的Confirm警告确认
export async function warningConfirm(operate) {
  await this.$confirm(`确认${operate}?`, '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  });
}

// 挂载到Vue原型上的Message成功提示
export async function successMessage(msg) {
  await this.$message({
    type: 'success',
    center: true,
    duration: 5000,
    message: msg
  });
}
// 挂载到Vue原型上的Notify失败提示
export async function errorMessage(msg) {
  await this.$message({
    type: 'error',
    center: true,
    duration: 5000,
    message: msg
  });
}
