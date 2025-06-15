export function useClientLocalStorage(key: string, defaultValue: boolean = false) {
  const [value, setValue] = useState(defaultValue)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = localStorage.getItem(key)
      setValue(raw === "true")
      setHydrated(true)
    }
  }, [key])

  return { value, hydrated }
}
