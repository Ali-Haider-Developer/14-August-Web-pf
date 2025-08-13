"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote } from "lucide-react"

const quotesData = [
  {
    id: 1,
    text: "With faith, discipline and selfless devotion to duty, there is nothing worthwhile that you cannot achieve.",
    author: "Quaid-e-Azam Muhammad Ali Jinnah",
    role: "Founder of Pakistan",
    category: "Leadership",
    context: "Inspiring the nation to achieve greatness through dedication and faith",
  },
  {
    id: 2,
    text: "The cultivation of the mind is a kind of food supplied for the soul of man. The mind of man has been compared to a piece of land.",
    author: "Allama Iqbal",
    role: "Poet-Philosopher of the East",
    category: "Wisdom",
    context: "Emphasizing the importance of education and intellectual growth",
  },
  {
    id: 3,
    text: "Pakistan not only means freedom and independence but the Muslim ideology which has to be preserved, which has come to us as a precious gift and treasure.",
    author: "Quaid-e-Azam Muhammad Ali Jinnah",
    role: "Father of the Nation",
    category: "Heritage",
    context: "Defining Pakistan's ideological foundation and cultural identity",
  },
  {
    id: 4,
    text: "Rise above sectional interests and private ambitions... Pass from matter to spirit. Matter is diversity; spirit is light, life and unity.",
    author: "Allama Iqbal",
    role: "National Poet of Pakistan",
    category: "Unity",
    context: "Calling for national unity and spiritual elevation",
  },
  {
    id: 5,
    text: "You have to stand guard over the development and maintenance of Islamic democracy, Islamic social justice and the equality of manhood in your own native soil.",
    author: "Quaid-e-Azam Muhammad Ali Jinnah",
    role: "First Governor-General",
    category: "Democracy",
    context: "Outlining the principles for Pakistan's democratic future",
  },
  {
    id: 6,
    text: "The ultimate aim of the ego is not to see something, but to be something.",
    author: "Allama Iqbal",
    role: "Philosopher of Self-Realization",
    category: "Self-Development",
    context: "Encouraging personal growth and self-actualization",
  },
  {
    id: 7,
    text: "No nation can rise to the height of glory unless your women are side by side with you.",
    author: "Quaid-e-Azam Muhammad Ali Jinnah",
    role: "Champion of Women's Rights",
    category: "Equality",
    context: "Advocating for women's participation in nation-building",
  },
  {
    id: 8,
    text: "Be sure that the ins and outs of your character are no mystery to Him; and one day you will find yourself exactly where you deserve to be.",
    author: "Allama Iqbal",
    role: "Spiritual Guide",
    category: "Spirituality",
    context: "Reflecting on divine justice and personal accountability",
  },
]

export default function QuotesSection() {
  const [currentQuote, setCurrentQuote] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotesData.length)
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const quote = quotesData[currentQuote]

  // Split text into words for animation
  const words = quote.text.split(" ")

  return (
    <section id="quotes" className="min-h-screen py-20 px-4 bg-background relative overflow-hidden flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-gold/20" />
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
          viewport={{ once: true, margin: "-100px" }}
          onViewportEnter={() => setIsVisible(true)}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-gradient mb-16">
            Inspirational Words from Our Leaders
          </h2>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuote}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <div className="p-4 bg-gradient-primary rounded-full shadow-premium">
                  <Quote size={32} className="text-white" />
                </div>
              </motion.div>

              {/* Animated Quote Text */}
              <div className="text-2xl md:text-4xl font-serif leading-relaxed mb-12 text-foreground">
                {words.map((word, index) => (
                  <motion.span
                    key={`${currentQuote}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isVisible ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1 + 0.5,
                      ease: "easeOut",
                    }}
                    className="inline-block mr-2"
                  >
                    {word}
                  </motion.span>
                ))}
              </div>

              {/* Author Information */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: words.length * 0.1 + 1 }}
                className="space-y-4"
              >
                <div className="text-xl md:text-2xl font-semibold text-primary">{quote.author}</div>
                <div className="text-lg text-muted-foreground">{quote.role}</div>
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <div className="inline-block px-4 py-2 bg-accent/20 rounded-full text-sm font-medium text-accent-foreground">
                    {quote.category}
                  </div>
                  {quote.context && (
                    <div className="text-sm text-muted-foreground max-w-md text-center italic">"{quote.context}"</div>
                  )}
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Quote Navigation Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex justify-center gap-3 mt-16"
          >
            {quotesData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentQuote(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentQuote
                    ? "bg-primary scale-125 shadow-lg"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
              />
            ))}
          </motion.div>

          {/* Decorative Elements */}
          <div className="absolute -top-10 -left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-10 blur-xl" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-gold rounded-full opacity-10 blur-xl" />
        </motion.div>

        {/* Leaders Information */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center bg-gradient-to-r from-green-dark/10 to-gold/10 p-8 rounded-2xl border border-border/30"
        >
          <h3 className="text-2xl md:text-3xl font-serif font-semibold mb-6 text-primary">
            Wisdom from Pakistan's Founding Fathers
          </h3>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-6">
            The words of Quaid-e-Azam Muhammad Ali Jinnah and Allama Iqbal continue to inspire generations of
            Pakistanis. Their vision for the nation, emphasis on education, unity, and spiritual development remain as
            relevant today as they were during the independence movement.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card/50 p-6 rounded-lg">
              <div className="text-4xl mb-4">🇵🇰</div>
              <h4 className="text-lg font-semibold text-primary mb-2">Quaid-e-Azam Muhammad Ali Jinnah</h4>
              <p className="text-sm text-muted-foreground">
                The founder of Pakistan whose vision and determination created a homeland for Muslims of the Indian
                subcontinent
              </p>
            </div>
            <div className="bg-card/50 p-6 rounded-lg">
              <div className="text-4xl mb-4">📚</div>
              <h4 className="text-lg font-semibold text-primary mb-2">Allama Iqbal</h4>
              <p className="text-sm text-muted-foreground">
                The poet-philosopher whose ideas and poetry inspired the Pakistan movement and continue to guide the
                nation
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
