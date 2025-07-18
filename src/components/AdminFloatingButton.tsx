'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface AdminInfo {
  character_image_url: string | null
  display_name: string
}

export default function AdminFloatingButton() {
  const [adminInfo, setAdminInfo] = useState<AdminInfo | null>(null)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    fetchAdminInfo()
  }, [])

  const fetchAdminInfo = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_info')
        .select('character_image_url, display_name')
        .eq('id', 1)
        .single()

      if (error) {
        console.error('管理人情報の取得エラー:', error)
        return
      }

      setAdminInfo(data)
    } catch (error) {
      console.error('管理人情報の取得中にエラーが発生しました:', error)
    }
  }

  if (!adminInfo) {
    return null
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/admin">
        <div
          className={`
            relative group cursor-pointer
            transition-all duration-300 ease-in-out
            ${isHovered ? 'scale-110' : 'scale-100'}
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* 画像コンテナ */}
          <div className="relative w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-full overflow-hidden border-4 border-white shadow-2xl">
            {adminInfo.character_image_url ? (
              <img
                src={adminInfo.character_image_url}
                alt={`管理人 ${adminInfo.display_name}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                <span className="text-white text-4xl font-bold">
                  {adminInfo.display_name.charAt(0)}
                </span>
              </div>
            )}
            
            {/* ホバー時のオーバーレイ - 一時的に無効化 */}
            {/* <div className={`
              absolute inset-0 bg-black/30 flex items-center justify-center
              transition-opacity duration-300
              ${isHovered ? 'opacity-100' : 'opacity-0'}
            `}>
              <span className="text-white text-sm font-bold">管理人ページ</span>
            </div> */}
          </div>
          
          {/* 脈動アニメーション - 一時的に無効化 */}
          {/* <div className="absolute inset-0 rounded-full border-4 border-orange-400 animate-ping opacity-75" style={{ animationDuration: '2s' }}></div> */}
          
          {/* ホバー時の説明テキスト */}
          <div className={`
            absolute bottom-full right-0 mb-2 px-3 py-1 
            bg-gray-800 text-white text-sm rounded-lg
            whitespace-nowrap transition-all duration-300
            ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
          `}>
            管理人について
            <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
          </div>
        </div>
      </Link>
    </div>
  )
}