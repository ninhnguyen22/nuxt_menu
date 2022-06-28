<template>
  <div class="site-content">
    <header class="header-common">
      <div class="home">
        <img src="/assets/images/home.svg" />
      </div>
      <div class="title">
        ホーム
      </div>
      <div class="notification">
        <div class="user">
          ID：名前名前名前
        </div>
        <div class="icon-container">
          <div class="notification-icon">
            <img src="/assets/images/notification.svg" />
          </div>
          <div class="menu-icon">
            <img src="/assets/images/menu.svg" />
          </div>
        </div>
      </div>
    </header>
    <div class="wrapper-container">
      <div id="my-circle-menu" class="cm-container">
        <ul class="cm-items" />
        <div class="cm-selected-container">
          <div class="cm-selected-label">
            <img class="img-selected" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { TweenMax } from 'gsap'

const DATA = []

DATA.push({
  label: 'a',
  url: 'menu-' + 0
})

DATA.push({
  label: 'b',
  url: 'menu-' + 1
})

DATA.push({
  label: 'c',
  url: 'menu-' + 2
})
DATA.push({
  label: 'd',
  url: 'menu-' + 3
})
DATA.push({
  label: 'e',
  url: 'menu-' + 4
})
DATA.push({
  label: 'f',
  url: 'menu-' + 5
})

DATA.push({
  label: 'test',
  url: 'menu-' + 6
})

DATA.push({
  label: 'test2',
  url: 'menu-' + 7
})
DATA.push({
  label: 'test3',
  url: 'menu-' + 8
})

DATA.push({
  label: 'test4',
  url: 'menu-' + 9
})

DATA.push({
  label: 'test5',
  url: 'menu-' + 10,
  image: 'menu10'
})

DATA.push({
  label: 'test6',
  url: 'menu-' + 11
})

DATA.push({
  label: 'test7',
  url: 'menu-' + 12
})

DATA.push({
  label: 'test8',
  url: 'menu-' + 13
})

DATA.push({
  label: 'test8',
  url: 'menu-' + 14
})

DATA.push({
  label: 'test8',
  url: 'menu-' + 15
})

DATA.push({
  label: 'test8',
  url: 'menu-' + 16
})

export default {
  name: 'IndexPage',

  data() {
    return {
      data: DATA,
      items: [],
      steps: null,
      lastPos: [],
      currentSelected: 0,
      animate: false,
      lastItemInTop: null,
      lastItemInBottom: null
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      if (this.data && this.data.length > 0) {
        this.createSteps()
        this.createItems()

        _.forEach(this.items, function(d, i) {
          d.find('a').on('click', function() {
            const url = $(this).attr('href')

            this.goto(url)

            return false
          })
        })

        $('.cm-button-prev').on('click', function() {
          this.prev()
        })
        $('.cm-button-next').on('click', function() {
          this.next()
        })

        let positionY = 0
        let isClick = false
        $('#my-circle-menu').on('click', function(event) {
          event.preventDefault()
          positionY = event.pageY
          isClick = true
        }).on('mousemove', event => {
          window.setTimeout(() => {
            event.preventDefault()
            if (isClick) {
              isClick = false
              if (positionY + 10 < event.pageY && positionY + 120 >= event.pageY) {
                this.prev(1)
              } else if (positionY + 120 < event.pageY && positionY + 240 >= event.pageY) {
                this.prev(2)
              } else if (positionY + 240 < event.pageY) {
                this.prev(2)
              } else if (positionY > event.pageY + 10 && positionY <= event.pageY + 120) {
                this.next(1)
              } else if (positionY > event.pageY + 120 && positionY <= event.pageY + 240) {
                this.next(2)
              }
              if (positionY > event.pageY + 240) {
                this.next(3)
              }
              positionY = 0
            }
          }, 200)
        }).on('touchstart', function(event) {
          event.preventDefault()
          const touch = event.originalEvent.touches[0]
          positionY = touch.pageY
        }).on('touchend', function(event) {
          event.preventDefault()
          const touch = event.originalEvent.changedTouches[0]
          if (positionY < touch.pageY && positionY + 200 >= touch.pageY) {
            this.next(1)
          } else if (positionY + 200 < touch.pageY && positionY + 400 >= touch.pageY) {
            this.next(2)
          } else if (positionY + 400 < touch.pageY) {
            this.next(3)
          } else if (positionY > touch.pageY && positionY <= touch.pageY + 200) {
            this.prev(1)
          } else if (positionY > touch.pageY + 200 && positionY <= touch.pageY + 400) {
            this.prev(2)
          } else if (positionY > touch.pageY + 400) {
            this.prev(3)
          }
        })

        $('.img-selected').on('click', function() {
        }).on('touchstart', function(event) {

        })
      }
    },

    createItems() {
      const cmItems = $('#my-circle-menu').find('.cm-items')

      _.forEach(this.data, (d, i) => {
        cmItems.append('<li id="item-' + i + '" class="cm-item"><img src="./assets/images/case1/' + d.url + '.svg"/></li>')
        this.items.push($('#item-' + i))
      })
      this.select(0, { init: true })
    },

    createSteps() {
      const theta = []; const steps = []; const positiveSteps = []
      const widePerItem = 30

      const maxDat = this.data.length

      const stepsCustom = [
        {
          left: 0,
          top: 0,
          width: 160
        },
        {
          top: -236,
          left: 192,
          width: 144
        },
        {
          left: 72,
          top: -352,
          width: 120
        },
        {
          top: -368,
          left: -64,
          width: 96
        },
        {
          top: -312,
          left: -152,
          width: 80
        },
        {
          top: -232,
          left: -208,
          width: 51
        },
        {
          top: -160,
          left: -216,
          width: 13
        },
        {
          top: -92,
          left: -232,
          width: 13
        },
        {
          top: -32,
          left: -240,
          width: 13
        },
        {
          top: 32,
          left: -240,
          width: 13
        },
        {
          top: 92,
          left: -232,
          width: 13
        },
        {
          top: 160,
          left: -216,
          width: 13
        },
        {
          top: 200,
          left: -208,
          width: 51
        },
        {
          top: 248,
          left: -152,
          width: 80
        },
        {
          top: 288,
          left: -64,
          width: 96
        },
        {
          top: 280,
          left: 120,
          width: 120
        },
        {
          top: 152,
          left: 192,
          width: 144
        }
      ]
      _.forEach(this.data, function(d, i) {
        let posX = 0; let posY = 0

        if (i <= Math.round((maxDat - 1) / 2)) {
          theta.push((widePerItem / 280) * i * Math.PI)
          //
          if (i === 0) {
            posX = Math.round((480 / 1.8) * (Math.cos(theta[i])))
            posY = -Math.round((640 / 1.8) * (Math.sin(theta[i])))

            steps.push({ left: posX - 37, top: posY - 50, width: 160 })
          } else {
            steps.push(stepsCustom[i])
          }
        } else {
          const x = i - Math.round((maxDat - 1) / 2)
          let top = steps[x].top * -1
          if (top === 232) {
            top = 200
          }

          if (top === 236) {
            top = 152
          }

          if (top === 312) {
            top = 248
          }

          if (top === 368) {
            top = 288
          }

          if (top === 352) {
            top = 264
          }

          positiveSteps.push({ left: steps[x].left, top, width: steps[x].width })
        }
      })

      if (positiveSteps.length > 0) {
        this.lastItemInTop = steps.length - 1
        this.lastItemInBottom = steps.length
        this.steps = _.concat(steps, _.reverse(positiveSteps))
      }
    },

    next(step = 1) {
      let offset = this.currentSelected
      const minOffset = 0; const maxOffset = this.data.length - step

      offset = offset < maxOffset ? offset + step : minOffset

      this.select(offset, { next: true })
    },

    prev(step = 1) {
      let offset = this.currentSelected
      const minOffset = 0; const maxOffset = this.data.length - step

      offset = offset > minOffset ? offset - step : maxOffset

      this.select(offset, { prev: true })
    },

    goto(targetSelected) {
      const offset = _.findIndex(this.data, ['url', targetSelected])

      this.select(offset, { goto: true })
    },

    select(offset, selectOpt) {
      const maxDat = this.data.length
      const cmLabel = $('.cm-selected-label')

      if (offset >= 0) {
        if (!this.animate) {
          this.animate = true

          const newPos = []
          let lastItem = null; let lastItemBot = null

          const completeAnimation = i => {
            i = parseInt(i)
            cmLabel.find('.img-selected').attr('src', `./assets/images/case1/${this.data[offset].url}.svg`)
            cmLabel.find('.img-selected').fadeIn(0)

            this.lastPos[i] = {
              left: newPos[i].css.left,
              top: newPos[i].css.top,
              width: newPos[i].width
            }

            if (i === offset) {
              // this.onChangeComplete ? this.onChangeComplete(this.data[i]) : null
            }

            this.animate = false
          }

          cmLabel.find('.img-selected').fadeOut(0)

          _.forEach(this.items, (d, i) => {
            d.fadeIn(800, function() {
              d.removeClass('selected')
            })

            const posId = (i - offset + maxDat) % maxDat

            if (posId === this.lastItemInTop) {
              lastItem = i
            }

            if (posId === this.lastItemInBottom) {
              lastItemBot = i
            }

            if (selectOpt && selectOpt.init) {
              this.lastPos.push({
                left: this.steps[posId].left,
                top: this.steps[posId].top,
                width: this.steps[posId].width
              })
            }

            newPos.push({
              left: this.steps[posId].left,
              top: this.steps[posId].top,
              width: this.steps[posId].width,
              onComplete: completeAnimation,
              onCompleteParams: [i]
            })

            if (offset === i) {
              console.log('' + this.steps[posId].left)
              /* d.fadeOut(100, function () {
                    d.addClass('selected');
                }); */
            }
          })

          if (selectOpt && selectOpt.goto) {
            _.forEach(this.items, function(d, i) {
              d.hide()
            })

            this.animateList(newPos)

            setTimeout(function() {
              _.forEach(this.items, function(d, i) {
                if (!d.hasClass('selected')) {
                  d.fadeIn()
                }
              })
            }, 1000)
          } else if (selectOpt && selectOpt.init) {
            this.animateList(newPos)
          } else {
            this.animateList(newPos, selectOpt, lastItem, lastItemBot)
          }

          this.currentSelected = offset
        }
      }
    },

    animateList(newPos, selectOpt, lastItem, lastItemBot) {
      _.forEach(this.items, (d, i) => {
        if (i === lastItem && selectOpt && selectOpt.next === true) { // perform next animation only for last in top section
          d.fadeOut(() => {
            const pos = {
              top: this.lastPos[i].top,
              left: this.lastPos[i].left
            }
            TweenMax.fromTo(d, 1, pos, newPos[i])

            setTimeout(function() {
              d.fadeIn()
            }, 800)
          })
        } else if (i === lastItemBot && selectOpt && selectOpt.prev === true) { // perform previous animation only for last in bottom section
          d.fadeOut(() => {
            const pos = {
              top: this.lastPos[i].top,
              left: this.lastPos[i].left
            }
            TweenMax.fromTo(d, 1, pos, newPos[i])

            setTimeout(function() {
              d.fadeIn()
            }, 800)
          })
        } else {
          d.children('img').css('width', `${newPos[i].width}px`)

          const pos = {
            top: this.lastPos[i].top,
            left: this.lastPos[i].left
          }
          TweenMax.fromTo(d, 1, pos, newPos[i]) // perform next-previous animation for all items
        }
      })
    }
  }
}
</script>
