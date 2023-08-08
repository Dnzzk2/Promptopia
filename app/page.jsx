import Feed from '@components/Feed'
import Link from 'next/link'

const Home = () => {
  return (
    <section className="w-full flex-col flex-center ">
      <h1 className="head_text text-center">
        发现和分享
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI 驱动的预设词</span>
      </h1>
      <p className="desc text-center">
        Promptopia是一个开源的人工智能提示工具，用于现代世界发现、创建和共享创造性预设词
      </p>
      <Link
        className="pt-1 text-center blue_gradient"
        href="https://www.youtube.com/watch?v=wm5gMKuwSYk"
        target="_blank"
      >
        来自JavaScript Mastery的NextJs学习课程
      </Link>

      <Feed />
    </section>
  )
}

export default Home
