import { useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { useTranslation } from 'contexts/Localization'
import { multicallv2 } from 'utils/multicall'
import profileABI from 'config/abi/gladiatorProfile.json'
import { getGladiatorProfileAddress } from 'utils/addressHelpers'
import useToast from 'hooks/useToast'

const useGetProfileCosts = () => {
  const { t } = useTranslation()
  const [isLoading, setIsLoading] = useState(true)
  const [costs, setCosts] = useState({
    numberNrtToReactivate: ethers.BigNumber.from(0),
    numberNrtToRegister: ethers.BigNumber.from(0),
    numberNrtToUpdate: ethers.BigNumber.from(0),
  })
  const { toastError } = useToast()

  useEffect(() => {
    const fetchCosts = async () => {
      try {
        const calls = ['numberNrtToReactivate', 'numberNrtToRegister', 'numberNrtToUpdate'].map((method) => ({
          address: getGladiatorProfileAddress(),
          name: method,
        }))
        const [[numberNrtToReactivate], [numberNrtToRegister], [numberNrtToUpdate]] = await multicallv2<
          [[ethers.BigNumber], [ethers.BigNumber], [ethers.BigNumber]]
        >(profileABI, calls)

        setCosts({
          numberNrtToReactivate,
          numberNrtToRegister,
          numberNrtToUpdate,
        })
        setIsLoading(false)
      } catch (error) {
        toastError(t('Error'), t('Could not retrieve NRT costs for profile'))
      }
    }

    fetchCosts()
  }, [setCosts, toastError, t])

  return { costs, isLoading }
}

export default useGetProfileCosts
