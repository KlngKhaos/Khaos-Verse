import React, { useState, useEffect } from 'react'
import { Button, Modal, AutoRenewIcon, Flex } from '@pancakeswap/uikit'
import { ModalActions } from 'components/Modal'
import { useTranslation } from 'contexts/Localization'
import styled from 'styled-components'
import BackSelectorSolo from 'views/Configurator/components/BackSelectorSolo'
import ViewerSolo from 'views/Configurator/components/ViewerSolo'
import { GalleryNft } from 'config/constants/gallery/types'
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter'
import axios from 'axios'
import useToast from 'hooks/useToast'

import useApproveConfirmTransaction from 'hooks/useApproveConfirmTransactionToBuyGladiator'
import { useCake, useGladiatorNft, useNrt } from 'hooks/useContract'
import { useWeb3React } from '@web3-react/core'
import { useCallWithGasPrice } from 'hooks/useCallWithGasPrice'
import { parseUnits } from '@ethersproject/units'
import pinataSdk from '@pinata/sdk'
import useStore from '../../Configurator/store/store'
import { MaxUint256 } from '@ethersproject/constants'
import { useProfileContract } from 'hooks/useContract'
import { addGladiatorsToDB } from "../../../state/nftMarket/helpers"
import QuickStart from './QuickStart'


interface Configurator3DNftModalProps {
  nft: GalleryNft
  onDismiss?: () => void
  history?: any
}

const StyledMain = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  @media (min-width: 320px) and (max-width: 480px) {
    width: 325px !important;
    align-items: start;
  }
  @media (min-width: 480px) and (max-width: 786px) {
    width: 86% !important;
    align-items: start;
  }
  @media (min-width: 786px) and (max-width: 1224px) {
    width: 85% !important;
  }
`
const NewModal = styled(Modal)`
  @media (min-width: 320px) and (max-width: 480px) {
    width: 100%;
    min-width: 100% !important;
  }
  @media (min-width: 480px) and (max-width: 786px) {
    width: 100%;
    min-width: 100% !important;
  }
  @media (min-width: 786px) and (max-width: 1224px) {
    width: 100%;
    min-width: 100% !important;
  }
`
const NewViewerSolo = styled(ViewerSolo)`
  @media (min-width: 320px) and (max-width: 480px) {
    width: 375px !important;
  }
`
const NewButton = styled(Button)`
  @media (min-width: 320px) and (max-width: 390px) {
    height: 75px !important;
  }
  @media (min-width: 390px) and (max-width: 425px) {
    height: 65px !important;
  }
  @media (min-width: 425px) and (max-width: 515px) {
    height: 55px !important;
  }
`
const QuickStartPane = styled.div<{ isQuickStart: boolean }>`
  flex: none;
  overflow: hidden;
  transition: width 200ms ease-in-out;
  width: ${({ isQuickStart }) => (isQuickStart ? '330px' : 0)};
  height: ${({ isQuickStart }) => (isQuickStart ? 'auto' : 0)};
  margin-left: 20px;
`
const MainModalContent = styled.div`
  display: flex;
  flex-direction: row;
`
const MainContentViewer = styled.div`
  display: flex;
  flex-direction: column;
`

const Configurator3DNftModal: React.FC<Configurator3DNftModalProps> = ({ onDismiss, nft, history }) => {

  localStorage.setItem("NFT", JSON.stringify(nft))
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { toastInfo, toastSuccess, toastError } = useToast()
  const updateBuyFlag = useStore((state) => state.updateBuyFlag)
  const buyFlag = useStore((state) => state.buyFlag)
  const { picHash, jsonHash, clearHashes, nft: finalNft } = useStore((state) => state)
  const [buyType, setBuyType] = useState<number>(0)
  const [modal, setModal] = useState(true);
  // if buyType === 0, it will call handleConfirm
  // if buyType === 1, it will call handleConfirmSGTU
  // console.log("picHashpicHashpicHashpicHashpicHashpicHashpicHash", picHash)
  // console.log("jsonHashjsonHashjsonHashjsonHashjsonHashjsonHash", jsonHash)

  const resetColors = () => {
    const resetting = { 0: "#fdfdfd" }
    localStorage.removeItem('con_curColor')
    localStorage.removeItem('con_curName')
    localStorage.removeItem('con_curSpeed')
    localStorage.removeItem('con_curBack')
    localStorage.removeItem('con_colors')
    setModal(false);
    setTimeout(() => {
      setModal(true)
      localStorage.removeItem("NFT")
    }, 1000);

  }
  const buyStatus = useStore((state) => state.buyStatus)
  const updateBuyStatus = useStore((state) => state.updateBuyStatus)

  const [curColor, setCurColor] = useState(
    localStorage.getItem('con_curColor') ? localStorage.getItem('con_curColor') : '#ffffff',
  )
  const [curName, setCurName] = useState(
    localStorage.getItem('con_curName') ? localStorage.getItem('con_curName') : 'None selected.',
  )
  const [curSpeed, setCurSpeed] = useState(
    localStorage.getItem('con_curSpeed') ? localStorage.getItem('con_curSpeed') : 1,
  )
  const [curBack, setCurBack] = useState(localStorage.getItem('con_curBack') ? localStorage.getItem('con_curBack') : 0)
  const [colors, setColors] = useState(
    JSON.parse(localStorage.getItem('con_colors')) ? JSON.parse(localStorage.getItem('con_colors')) : {},
  )
  const [loaded, setLoaded] = useState(false)

  const isButtonEnable = buyStatus.model && buyStatus.json && buyStatus.image && buyStatus.gif

  useEffect(() => {
    if (loaded && buyStatus.model && buyStatus.json && buyStatus.image && buyStatus.gif) {
      toastSuccess(t('Success!'), t('You have successfully purchased the NFT.'))
      onDismiss()
    }
    setLoaded(true)
    // eslint-disable-next-line
  }, [buyStatus])

  const profileContract = useProfileContract()
  const getUserStatus = async () => {
    const data = await profileContract.getUserStatus(account)
    if (!data) {
      onDismiss()
      history.push('/create-profile')
    }
  }

  useEffect(() => {
    getUserStatus()
  }, [])
  const setCurrentColor = (col) => {
    setCurColor(col)
    localStorage.setItem('con_curColor', col)

    const temp = { ...colors }
    temp[curName] = col
    setColors(temp)
    localStorage.setItem('con_colors', JSON.stringify(colors))
  }

  const setCurrentName = (name) => {
    setCurName(name)
    setCurColor(colors[name] ? colors[name] : '#ffffff')

    localStorage.setItem('con_curName', name)
  }

  const setCurrentBack = (back) => {
    setCurBack(back)
    localStorage.setItem('con_curBack', back)
  }

  const exporter = new GLTFExporter()

  const exportModel = (scene, animation) => {
    const link = document.createElement('a')
    link.style.display = 'none'
    document.body.appendChild(link)

    exporter.parse(
      scene,
      (gltf) => {
        const output = JSON.stringify(gltf, null, 2)

        const blob = new Blob([output], { type: 'text/plain' })
        const data = new FormData()
        data.append('file', blob)

        const metadata = JSON.stringify({
          name: 'GLTF model',
        })
        data.append('pinataMetadata', metadata)

        const pinataApiKey = process.env.REACT_APP_pinataApiKey
        const pinataSecretApiKey = process.env.REACT_APP_pinataSecretApiKey
        const url = process.env.REACT_APP_pinFilePostURL

        axios
          .post(url, data, {
            headers: {
              'Content-Type': `multipart/form-data; boundary=`,
              pinata_api_key: pinataApiKey,
              pinata_secret_api_key: pinataSecretApiKey,
            },
          })
          .then((response) => {
            updateBuyStatus({ model: true })
          })
          .catch((err) => {
            showToast('error', 'Your purchase was not successful at this moment, please try again')
            onDismiss()
          })
      },
      { trs: true, forceIndices: true, includeCustomExtensions: true, animations: animation },
    )
  }

  const setModel = (scene, anim) => {
    if (buyFlag) {
      const model = scene
      const animation = anim

      // exportModel(model, animation)

      updateBuyFlag(false)
    }
  }

  const showToast = (type, content) => {
    if (type === 'success') {
      toastSuccess(t('Success!'), t(content))
    } else if (type === 'error') {
      toastError(t('Sorry'), t(content))
    }
  }

  // Enable and Buy Gladiator

  const minimumNrtRequired = parseUnits(nft.initialLifeCycle.price.toString())
  const allowance = minimumNrtRequired
  const minimumNrtRequiredSGTU = parseUnits(nft.finalLifeCycle.price.toString())
  const allowanceSGTU = minimumNrtRequiredSGTU
  const nrtContract = useNrt()
  const gladiatorNftContract = useGladiatorNft()
  const { callWithGasPrice } = useCallWithGasPrice()
  const [click, setClick] = useState(false)

  const handleClick = () => {
    setClick(!click)
  }

  const {
    isApproving,
    isApproved,
    isApprovingFailed,

    handleApprove,
    isConfirmed,
    isConfirming,
    isConfirmingFailed,

    handleConfirm,
    handlePriorConfirm,
    isApprovedSGTU,
    isApprovingSGTU,
    isApprovingFailedSGTU,

    isConfirmedSGTU,
    isConfirmingSGTU,
    isConfirmedFailedSGTU,

    handleApproveSGTU,
    handleConfirmSGTU,
    handlePriorConfirmSGTU,
  } = useApproveConfirmTransaction({
    onDismiss: onDismiss,
    onRequiresApproval: async () => {
      // TODO: Move this to a helper, this check will be probably be used many times
      try {
        const response = await nrtContract.allowance(account, gladiatorNftContract.address)
        // console.log("responseeeeeeeeeeeeeeeeeeeeeeeeeeee===================", response)
        return response.gte(minimumNrtRequired)
      } catch (error) {
        return false
      }
    },
    onRequiresApprovalSGTU: async () => {
      // TODO: Move this to a helper, this check will be probably be used many times
      try {
        const response = await nrtContract.allowance(account, gladiatorNftContract.address)
        return response.gte(minimumNrtRequiredSGTU)
      } catch (error) {
        return false
      }
    },
    onApprove: () => {
      return callWithGasPrice(nrtContract, 'approve', [gladiatorNftContract.address, MaxUint256.toString()])
    },
    onApproveSuccess: () => {
      toastSuccess(t('Enabled'), t('Gladiator is approved successfully and ready to buy'))
    },
    onConfirm: async () => {
      try {
        // const pinata = pinataSdk(
        //   process.env.REACT_APP_pinataApiKey,
        //   process.env.REACT_APP_pinataSecretApiKey,
        // )
        // const deployed = await pinata.pinJSONToIPFS({...nft, curColor,  curName, curSpeed, curBack, colors}) //
        const data = await callWithGasPrice(gladiatorNftContract, 'buyGladiator', [
          nft.name, // id of gladiator
          1, // price of gladiator
          '0x0000000000000000000000000000000000000000', // URI
          `ipfs://${jsonHash}`,
        ])
        // console.log("dataaaaaaaaaaaaaaaaaaaaa", data)
        return data
      } catch (error: any) {
        throw new Error(error)
      }
    },
    onApproveSGTU: () => {
      return callWithGasPrice(nrtContract, 'approve', [gladiatorNftContract.address, MaxUint256.toString()])
    },
    onConfirmSGTU: async () => {
      try {
        // const pinata = pinataSdk(
        //   process.env.REACT_APP_pinataApiKey,
        //   process.env.REACT_APP_pinataSecretApiKey,
        // )
        // const deployed = await pinata.pinJSONToIPFS({...nft, curColor,  curName, curSpeed, curBack, colors})
        const data = await callWithGasPrice(gladiatorNftContract, 'buyGladiator', [
          nft.name,
          2,
          '0x0000000000000000000000000000000000000000',
          `ipfs://${jsonHash}`,
        ])
        return data
      } catch (error: any) {
        throw new Error(error)
      }
    },
    onSuccess: () => {
      toastSuccess(t('success'), t('Gladiator is Bought successfully and sent to school'))
    },
  })
  const buyAction = (num) => {
    if (!account) {
      toastInfo(t('Unable to find wallet'), t('Please connect the wallet first'))
    } else {
      setBuyType(num)
      if (num === 0) {
        handlePriorConfirm()
      } else if (num === 1) {
        handlePriorConfirmSGTU()
      }
      updateBuyFlag(true)
      updateBuyStatus({
        model: false,
        json: false,
        image: false,
        gif: false,
      })
    }
  }
  useEffect(() => {
    if (isConfirmed) {
      onDismiss()
      setTimeout(() => {
        history.push('/school')
      }, 6000)
    }
    if (isConfirmedSGTU) {
      onDismiss()
      setTimeout(() => {
        history.push('/mygladiators')
      }, 6000)
    }
  }, [isConfirmed, isConfirmedSGTU, isApproved, isApprovedSGTU])

  useEffect(() => {
    if (jsonHash && buyStatus.json) {
      // console.log("jsonHashjsonHashjsonHashjsonHashjsonHash nnnnnnnnnnnnn", jsonHash)
      if (buyType === 0) {
        handleConfirm()
      } else if (buyType === 1) {
        handleConfirmSGTU()
      }
    }
  }, [jsonHash])

  useEffect(() => {
    return () => {
      clearHashes()
    }
  }, [])
  useEffect(() => { }, [finalNft])
  const spinnerIcon = <AutoRenewIcon spin color="currentColor" />
  // console.log("curBackcurBackcurBackcurBackcurBackcurBackcurBackcurBack", curBack)

  useEffect(() => {

    return () => {
      resetColors()
    }
  }, [])


  return (<>
    {modal && <NewModal title={nft.name} onDismiss={onDismiss} minWidth="1200px">
      <MainModalContent>
        <MainContentViewer>
          <StyledMain>
            <BackSelectorSolo curBack={curBack} setBack={setCurrentBack} curColor={curColor} setColor={setCurrentColor} />
            <NewViewerSolo
              setModel={setModel}
              nft={nft}
              curColor={curColor}
              curName={curName}
              setCurName={(name) => setCurrentName(name)}
              curSpeed={curSpeed}
              curBack={curBack}
              colors={colors}
              showToast={showToast}
            />
          </StyledMain>
          <Flex justifyContent="end">
            <Button isLoading={
              (!isApprovingFailed ? (isApproving || isConfirming ? true : false) : !isApprovingFailed) ||
              (!isApprovingFailedSGTU ? (isApprovingSGTU || isConfirmingSGTU ? true : false) : !isApprovingFailedSGTU)
            } variant="secondary" scale="sm" onClick={resetColors} style={{ marginTop: '10px' }}>
              {t('Reset')}
            </Button>
            <div style={{ width: '24px', height: '24px' }}>{ }</div>
            <Button
              isLoading={
                (!isApprovingFailed ? (isApproving || isConfirming ? true : false) : !isApprovingFailed) ||
                (!isApprovingFailedSGTU ? (isApprovingSGTU || isConfirmingSGTU ? true : false) : !isApprovingFailedSGTU)
              }
              variant="secondary"
              scale="sm"
              onClick={handleClick}
              style={{ marginTop: '10px', backgroundColor: 'green', color: 'white', borderColor: 'green' }}
            >
              {t('Quick Start')}
            </Button>
          </Flex>
          <ModalActions>
            {/* buy Action */}
            {/* <Button variant="secondary" onClick={onDismiss} width="100%" disabled={ !isButtonEnable }>
          {t('Close')}
        </Button>
        <Button onClick={buyAction} width="100%" disabled={ !isButtonEnable }>
          { isButtonEnable ? t('Buy') : t('Buying')} */}
            <NewButton isLoading={
              (!isApprovingFailed ? (isApproving || isConfirming ? true : false) : !isApprovingFailed) ||
              (!isApprovingFailedSGTU ? (isApprovingSGTU || isConfirmingSGTU ? true : false) : !isApprovingFailedSGTU)
            } variant="secondary" onClick={onDismiss} width="100%" style={{ marginTop: '10px' }}>
              {t('Close')}
            </NewButton>
            <NewButton
              endIcon={!isApprovingFailed ? (isConfirming || isApproving ? spinnerIcon : undefined) : undefined}
              isLoading={
                (!isApprovingFailed ? (isApproving || isConfirming ? true : false) : !isApprovingFailed) ||
                (!isApprovingFailedSGTU ? (isApprovingSGTU || isConfirmingSGTU ? true : false) : !isApprovingFailedSGTU)
              }
              onClick={!isApproved ? handleApprove : () => buyAction(0)}
              width="100%"
              style={{ marginTop: '10px' }}
            >
              <img
                src="/images/gallery/going-to-school.png"
                alt="Ready for Battle"
                width="36px"
                style={{ marginRight: '5px' }}
                loading="lazy"
              />
              {!isApproved
                ? t(
                  `Approve ${nft.initialLifeCycle.price} NRT Gladiator Stays in Battle School, You will be rewarded with DENA while in School`,
                )
                : t(
                  `Buy ${nft.initialLifeCycle.price} NRT Gladiator Stays in Battle School, You will be rewarded with DENA while in School`,
                )}
              {/* 
          {!isApproved
            ? t(
                `Enable ${nft.initialLifeCycle.price} NRT Gladiator Stays in Battle School, You will be rewarded with DENA while in School`,
              )
            : t(
                `Buy ${nft.initialLifeCycle.price} NRT Gladiator Stays in Battle School, You will be rewarded with DENA while in School`,
              )} */}
            </NewButton>
            <NewButton
              variant="secondary"
              endIcon={!isApprovingFailedSGTU ? (isConfirmingSGTU || isApprovingSGTU ? spinnerIcon : undefined) : undefined}
              isLoading={
                (!isApprovingFailed ? (isApproving || isConfirming ? true : false) : !isApprovingFailed) ||
                (!isApprovingFailedSGTU ? (isApprovingSGTU || isConfirmingSGTU ? true : false) : !isApprovingFailedSGTU)
              }
              onClick={!isApprovedSGTU ? handleApproveSGTU : () => buyAction(1)}
              width="100%"
              style={{ marginTop: '10px', backgroundColor: 'green', color: 'white', borderColor: 'green' }}
            >
              <img
                src="/images/gallery/ready-to-battle.png"
                alt="Ready for Battle"
                width="36px"
                style={{ marginRight: '10px' }}
              />
              {!isApprovedSGTU
                ? t(`Approve ${nft.finalLifeCycle.price} NRT Skip School, Gladiator is ready for battle`)
                : t(`Buy ${nft.finalLifeCycle.price} NRT Skip School, Gladiator is ready for battle`)}
            </NewButton>
          </ModalActions>
        </MainContentViewer>
        <QuickStartPane isQuickStart={click}>
          <QuickStart />
        </QuickStartPane>
      </MainModalContent>
    </NewModal>
    }
  </>
  )
}

export default Configurator3DNftModal
