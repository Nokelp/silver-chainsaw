<template>
  <view class="content">
    <view class="header">
      <view class="iconfont icon-caidan caidan"></view>
      <view  class="search">
        <text class="iconfont icon-sousuo "></text>
        搜索
      </view>
    </view>
    <!-- 轮播图 -->
    <view class="banner">
      <swiper class="swiper" circular :indicator-dots="banners.indicatorDots" :autoplay="banners.autoplay" :interval="banners.interval"
				:duration="banners.duration">
				<swiper-item v-for="item in bannerlist" :key="item.bannerId">
					<image :src="item.pic" mode="widthFix"></image>
				</swiper-item>
			</swiper>
    </view>
    <!-- tabs -->
    <view class="tabs">
      <scroll-view  class="tablist" scroll-x="true"  scroll-left="120">
        <view class="list">
          <view class="tab" v-for="item in tablist" :key="item.title">
            <view class="tpic"><image  mode="widthFix" :src="item.imageUrl" alt=""/></view>
            <view class="tabtext">{{item.title}}</view>
        </view>
        </view>
      </scroll-view>  
    </view>
    <!-- 推荐歌单 -->
    <view class="content1">
      <view class="title1">推荐歌单</view>
      <view class="scrlist">
        <scroll-view  scroll-x>
          <!-- songList.uiElement.image.imageUrlv-
          songList.uiElement.mainTitle.title -->
            <view class="slist">
              <view class="src" v-for="item in songlist" :key="item.title">
                <image mode="widthFix" :src="item.imageUrl" />
                <view>{{ item.title }}</view>
              </view>
            </view>
          </scroll-view> 
      </view>
    </view>
    <!-- 热门精选 -->
    <view class="content2">
      <view class="title2">{{title2}}</view>
      <view class="con2-list">
        <scroll-view scroll-x scroll-left="375">
          <view class="tablelist">
            <view class="recSong" v-for="item in hotlist" :key="item">
              <view class="recslist">
                <view class="song-item" v-for="it in item.resources" :key="it.resourceId">
                  <view class="sit">
                    <image class="con2pic" mode="widthFix" :src="it.uiElement.image.imageUrl"></image>
                    <view class="info">
                      <view class="play">
                        <view>{{it.uiElement.mainTitle.title}}</view>
                        <view class="ico iconfont icon-bofang"></view>
                      </view>
                      <view class="name">{{it.resourceExtInfo.artists[0].name}}</view>
                    </view>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
  
</template>

<script setup lang="ts">
import { ref,reactive } from 'vue'
import { getallDataApi } from '../service';

interface Banners{
  bannerId:string
  pic:string
  url:string
}
interface Tabs{
  imageUrl:string
  title:string
}
interface Songlist{
  imageUrl:string
  title:string
}
interface Hotlist{
  imageUrl:string
  title:string
  name:string
}

let  totalData=[]
const bannerlist=ref<Banners[]>([])
const tablist=ref<Tabs[]>([])
const songlist=ref<Songlist[]>([])
const title2=ref<string>()
const hotlist = ref<any[]>([])

getallDataApi()
  .then(
    (res:any)=>{
      console.log(res)
      totalData=res.data.blocks
      console.log(totalData)
      bannerlist.value=totalData[0].extInfo.banners.map((it: { pic: any; url: any; bannerId: any; })=>{return { pic:it.pic,url:it.url,bannerId:it.bannerId} })
      console.log( bannerlist.value)
      tablist.value=totalData[1].creatives[0].resources.map((item: { uiElement: { image: { imageUrl: any; }; mainTitle: { title: any; }; }; })=>{return {imageUrl:item.uiElement.image.imageUrl,title:item.uiElement.mainTitle.title,}})
      songlist.value=totalData[2].creatives.map((item: { uiElement: { image: { imageUrl: any; }; mainTitle: { title: any; }; }; })=>{return {imageUrl:item.uiElement.image.imageUrl,title:item.uiElement.mainTitle.title}})
      // 模块标题
      title2.value =totalData[3].uiElement.subTitle.title
      // 热歌模块
      hotlist.value=totalData[3].creatives
    }
  )


const  banners=reactive(
  {
            indicatorDots: true,
            autoplay: true,
            interval: 2000,
            duration: 500
        }
)


</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.header{
  width: 100%;
  height: 60px;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  .caidan{
    width: 40px;
    height: 40px;
    font-size: 30px;
    line-height: 40px;
    text-align: center;
    margin: 0 10px;
  }
  .search{
    flex: 1;
    height: 40px;
    background: #ccc;
    border-radius: 5px;
    text-align: center;
    line-height: 40px;
    color: #777;
  }
}
.banner{
  width: 100%;
  padding: 0 15px;
}
.swiper {
		height: 276rpx;
    image{
      width: 100%;
      border-radius: 10px;
    }
	}
  .tabs{
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    margin: 10px 0;
  }
  .tablist{
    width: 100%;
  }
  .list{
    width: 220%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    .tab{
      width: calc(100%/11 - 30px);
      margin: 0 10;
      .tpic{
        width: 100%;
        text-align: center;
        border-radius: 50%;
        background: #C84341;
        margin: 0 0 10px;
        font-size: 12px;
        image{
          width: 100%;
        }
      }
      .tabtext{
        text-align: center;
        font-size: 12px;
      }
    }
  }
  // 歌单1
.content1{
  width: 100%;
}
.title1{
  padding: 12px 10px;
}
.srclist{
  width: 100%;
  overflow: hidden;
  height: 160px;
}
.slist{
  display: flex;
  align-items: center;
  justify-content: space-around;
  .src{
    flex-shrink: 0;
    width: 120px;
    height: 160px;
    margin: 0 10px 10px;
    image{
      width: 100%;
    }
    view{
      font-size: 12px;
      white-space: pre-line;
    };
  }
}
.content2{
  width: 100%;
}
.title2{
  padding: 12px 10px;
}
.tablelist{
  display: flex;
}
.recslist{
  display: flex;
  flex-direction: column;
}
.con2pic{
  width: 43px;
}
.sit{
  display: flex;
  width: 335px;
  height: 67px;
  padding: 10px 15px;
  image{
    margin-right: 10px;
  }
  .info{
    flex: 1;
    .play{
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
      .ico{
        font-size: 20px;
      }
    }
  }

}
</style>
