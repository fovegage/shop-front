<template>
  <div class="user-message">
    <div class="container">
      <div class="crumb">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>消息中心</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="user-message-body">
        <Side></Side>
        <div class="user-message-content">
          <div class="wrap">
            <div class="message-title">
              <h1>消息中心</h1>
            </div>
            <div class="message-category">
              <h3 :class="{'checked':messageSelect==='SYSTEM'}" @click="filterMessage('SYSTEM')">系统公告</h3>
              <h3 :class="{'checked':messageSelect==='EXPRESS'}" @click="filterMessage('EXPRESS')">物流动态</h3>
            </div>
            <div class="line"></div>
            <div class="message-body">
              <ul>
                <li v-for="(notice,idx) in notices" :key="idx">
                  <div class="message-box">
                    <div class="message-content">{{ notice.title }}</div>
                    <div class="message-datetime">{{ notice.add_time | formatCreateTime }}</div>
                  </div>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Side from "../../components/side";
import {formatDate} from "../../utils/date";

export default {
  name: "message",
  components: {
    Side
  },
  mounted() {
    this.getNotice();
  },
  filters: {
    formatCreateTime(time) {
      let date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    }
  },
  created() {
    document.title = '消息中心 - JapanHui';
  },
  data() {
    return {
      messageSelect: 'EXPRESS',
      notices: []
    }
  }, methods: {
    filterMessage(type) {
      this.messageSelect = type;
      if (type === 'EXPRESS') {
        this.getNotice();
      } else {
        this.notices = [];
      }

    },
    getNotice() {
      this.axios.get('/notices/').then((res) => {
        this.notices = res.data.list;
      })
    }

  }
}
</script>

<style lang="scss">

.user-message {
  background-color: #F5F5F5;

  .crumb {
    padding: 10px 0;
    display: flex;
    align-items: center;
    height: 30px;
  }

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;

    .user-message-body {
      display: flex;
      justify-content: space-between;

      .user-message-content {
        margin-bottom: 40px;
        background-color: #FFFFFF;
        width: 950px;

        .wrap {
          margin-top: 20px;
          margin-left: 25px;

          .line {
            margin-bottom: 20px;
            border-bottom: 2px solid #F8F8F8;
          }

          .message-title {
            h1 {
              margin: 0;
              font-size: 30px;
              font-weight: 400;
              line-height: 68px;
              color: #757575;
            }
          }

          .message-category {
            margin-bottom: 10px;
            display: flex;
            justify-content: flex-start;
            align-items: center;

            .checked {
              color: #ff6600;
            }

            h3 {
              margin-left: 30px;
              font-weight: normal;
              cursor: pointer;
              // 注意层级
              &:first-child {
                margin-left: 0;
              }
            }
          }


          .message-body {

            ul {
              li {
                margin-bottom: 10px;

                .message-box {
                  height: 30px;
                  font-size: 16px;

                  .message-content {
                    float: left;
                    cursor: pointer;
                  }

                  .message-datetime {
                    float: right;
                    margin-right: 40px;
                  }

                }
              }
            }
          }
        }
      }
    }
  }
}
</style>