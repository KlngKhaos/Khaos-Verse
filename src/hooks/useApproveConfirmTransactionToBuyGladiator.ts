import { useEffect, useReducer, useRef } from 'react'
import { noop } from 'lodash'
import { useWeb3React } from '@web3-react/core'
import { ethers } from 'ethers'
import useToast from 'hooks/useToast'
import { useTranslation } from 'contexts/Localization'
import useStore from '../views/Configurator/store/store';
import {addGladiatorsToDB} from "../state/nftMarket/helpers"
import useStore2 from "../views/PoolTour3D/store"
type LoadingState = 'idle' | 'loading' | 'success' | 'fail' | 'fail2'

type Action =
  | { type: 'requires_approval' }
  | { type: 'requires_approval_to_user' }
  | { type: 'approve_sending' }
  | { type: 'approve_receipt' }
  | { type: 'approve_error' }
  | { type: 'approve_error2' }
  | { type: 'confirm_sending' }
  | { type: 'confirm_receipt' }
  | { type: 'confirm_error' }
  | { type: 'confirm_error2' }
  | { type: 'approve_sending_to_user' }
  | { type: 'approve_receipt_to_user' }
  | { type: 'approve_error_to_user' }
  | { type: 'approve_error2_to_user' }
  | { type: 'confirm_sending_to_user' }
  | { type: 'confirm_receipt_to_user' }
  | { type: 'confirm_error_to_user' }
  | { type: 'confirm_error2_to_user' }
  | { type: 'approve_idle' }
  | { type: 'approve_idle_to_user' }

interface State {
  approvalState: LoadingState
  confirmState: LoadingState
  approvalStateSGTU: LoadingState
  confirmStateSGTU: LoadingState
}

const initialState: State = {
  approvalState: 'idle',
  confirmState: 'idle',
  approvalStateSGTU: "idle",
  confirmStateSGTU: "idle"
}

const reducer = (state: State, actions: Action): State => {
  switch (actions.type) {
    case 'requires_approval':
      return {
        ...state,
        approvalState: 'success',
      }
    case 'requires_approval_to_user':
      return {
        ...state,
        approvalStateSGTU: 'success',
      }
    case 'approve_sending':
      return {
        ...state,
        approvalState: 'loading',
      }
    case 'approve_idle':
      return {
        ...state,
        approvalState: 'idle',
      }
    case 'approve_receipt':
      return {
        ...state,
        approvalState: 'success',
      }
    case 'approve_error':
      return {
        ...state,
        approvalState: 'fail',
      }
    case 'approve_error2':
      return {
        ...state,
        approvalState: 'fail2',
      }
    case 'approve_sending_to_user':
      return {
        ...state,
        approvalStateSGTU: 'loading',
      }
    case 'approve_receipt_to_user':
      return {
        ...state,
        approvalStateSGTU: 'success',
      }
    case 'approve_idle_to_user':
      return {
        ...state,
        approvalStateSGTU: 'idle',
      }
    case 'approve_error_to_user':
      return {
        ...state,
        approvalStateSGTU: 'fail',
      }
    case 'approve_error2_to_user':
      return {
        ...state,
        approvalStateSGTU: 'fail2',
      }
    case 'confirm_sending':
      return {
        ...state,
        confirmState: 'loading',
      }
    case 'confirm_receipt':
      return {
        ...state,
        confirmState: 'success',
      }
    case 'confirm_error':
      return {
        ...state,
        confirmState: 'fail',
      }
    case 'confirm_error2':
      return {
        ...state,
        confirmState: 'fail2',
      }
    case 'confirm_sending_to_user':
      return {
        ...state,
        confirmStateSGTU: 'loading',
      }
    case 'confirm_receipt_to_user':
      return {
        ...state,
        confirmStateSGTU: 'success',
      }
    case 'confirm_error_to_user':
      return {
        ...state,
        confirmStateSGTU: 'fail',
      }
    case 'confirm_error2_to_user':
      return {
        ...state,
        confirmStateSGTU: 'fail2',
      }
    default:
      return state
  }
}

interface OnSuccessProps {
  state: State
  receipt: ethers.providers.TransactionReceipt
}

interface ApproveConfirmTransaction {
  onApprove: () => Promise<ethers.providers.TransactionResponse>
  onApproveSGTU?: () => Promise<ethers.providers.TransactionResponse> // onApproveSendGladiatorToUser
  onConfirm?: () => Promise<ethers.providers.TransactionResponse>
  onConfirmSGTU?: () => Promise<ethers.providers.TransactionResponse>  // onConfirmSendGladiatorToUser
  onRequiresApproval?: () => Promise<boolean>
  onRequiresApprovalSGTU?: () => Promise<boolean>
  onSuccess?: ({ state, receipt }: OnSuccessProps) => void
  onApproveSuccess?: ({ state, receipt }: OnSuccessProps) => void
  onSuccessSGTU?: ({ state, receipt }: OnSuccessProps) => void
  onApproveSuccessSGTU?: ({ state, receipt }: OnSuccessProps) => void
  onDismiss?: any
}


// const [curColor, setCurColor] = useState(localStorage.getItem('con_curColor') ? localStorage.getItem('con_curColor') : '#ffffff');
// const [curName, setCurName] = useState(localStorage.getItem('con_curName') ? localStorage.getItem('con_curName') : 'None selected.');
// const [curSpeed, setCurSpeed] = useState(localStorage.getItem('con_curSpeed') ? localStorage.getItem('con_curSpeed') : 1);
// const [curBack, setCurBack] = useState(localStorage.getItem('con_curBack') ? localStorage.getItem('con_curBack') : 0);
// const [colors, setColors] = useState(JSON.parse(localStorage.getItem('con_colors')) ? JSON.parse(localStorage.getItem('con_colors')) : {});

const resetColors = () => {
  const resetting= {0:"#fdfdfd"}
  localStorage.removeItem('con_curColor')
  localStorage.removeItem('con_curName')
  localStorage.removeItem('con_curSpeed')
  localStorage.removeItem('con_curBack')
  localStorage.removeItem('con_colors')
}
const useApproveConfirmTransaction = ({
  onDismiss,
  onApprove,
  onConfirm,
  onApproveSGTU,
  onConfirmSGTU,
  onRequiresApproval,
  onRequiresApprovalSGTU,
  onSuccess = noop,
  onSuccessSGTU = noop,
  onApproveSuccess = noop,
  onApproveSuccessSGTU = noop,
}: ApproveConfirmTransaction) => {
  const {nft, setNft} = useStore(state => state)
  const {setMyGladiators, setSchoolGladiators, setUsersGladiators} = useStore2(state => state)
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const [state, dispatch] = useReducer(reducer, initialState)
  const handlePreApprove = useRef(onRequiresApproval)
  const handlePreApproveSGTU = useRef(onRequiresApprovalSGTU)
  const { toastError, toastSuccess } = useToast()
  // Check if approval is necessary, re-check if account changes
  useEffect(() => {
    if (account && handlePreApprove.current) {
      handlePreApprove.current().then((result) => {
        if (result) {
          dispatch({ type: 'requires_approval' })
        }
      })
    }
  }, [account, handlePreApprove, dispatch])
  useEffect(() => {
    if (account && handlePreApproveSGTU.current) {
      handlePreApproveSGTU.current().then((result) => {
          if (result) {
          dispatch({ type: 'requires_approval_to_user' })
        }
      })
    }
  }, [account, handlePreApproveSGTU, dispatch])

  return {
    isApproving: state.approvalState === 'loading',
    isApproved: state.approvalState === 'success',
    isApprovingFailed: state.approvalState === 'fail',

    isApprovingSGTU: state.approvalStateSGTU === 'loading',
    isApprovingFailedSGTU: state.approvalStateSGTU === 'fail',
    isApprovedSGTU: state.approvalStateSGTU === 'success',

    isConfirming: state.confirmState === 'loading',
    isConfirmed: state.confirmState === 'success',
    isConfirmingFailed: state.confirmState === "fail2",

    isConfirmingSGTU: state.confirmStateSGTU === 'loading',
    isConfirmedSGTU: state.confirmStateSGTU === 'success',
    isConfirmedFailedSGTU: state.confirmStateSGTU === 'fail2',
    handleApprove: async () => {
      try {
        dispatch({ type: 'approve_sending' })
        const tx = await onApprove()
        const receipt = await tx.wait()
        if (receipt.status) {
          dispatch({ type: 'approve_receipt' })
          dispatch({ type: 'approve_receipt_to_user' })
          toastSuccess(t('success'), t('Gladiator is approved successfully and ready to buy'))
          //this has to be the last thing to run otherwhise state issues
          onApproveSuccess({ state, receipt })
        }
      } catch (error) {
        dispatch({ type: 'approve_error' })
        toastError(t('Error'), t('You have rejected the transaction'))
      }
    },
    handleConfirm: async () => {
      try {
        dispatch({ type: 'confirm_sending' })
        const tx = await onConfirm()
        const receipt = await tx.wait()
        if (receipt.status) {
          const tokenId = receipt.logs[receipt.logs.length - 1].data
          const id = parseInt(tokenId, 16);
          const data = {
            tokenId: id,
            customization3DJson: {},
            ipfsJson: nft
          }
          const gladiatorAsdded = await addGladiatorsToDB(data)
          // console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data)

          if(id == gladiatorAsdded.tokenId){
            setSchoolGladiators(null)
            setMyGladiators(null)
            setNft(null)
            dispatch({ type: 'confirm_receipt' })
            dispatch({ type: 'approve_idle' })
            dispatch({ type: 'confirm_error2_to_user' })
            resetColors()
            toastSuccess(t('success'), t('Gladiator is Bought successfully and sent to school'))
            //this has to be the last thing to run otherwhise state issues
            onSuccess({ state, receipt })
          }
        }
      } catch (error) {
        // console.log("eeeeeerrrrrrrrrrooooooor11111111111", error)
        dispatch({ type: 'approve_receipt' })
        dispatch({ type: 'approve_receipt_to_user' })
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    },
    handlePriorConfirm: async () => {
        dispatch({ type: 'confirm_sending' })
    },
    handleApproveSGTU: async () => {
      try {
        dispatch({ type: 'approve_sending_to_user' })
        const tx = await onApproveSGTU()
        const receipt = await tx.wait()
        if (receipt.status) {
          dispatch({ type: 'approve_receipt_to_user' })
          dispatch({ type: 'approve_receipt' })
          toastSuccess(t('success'), t('Gladiator is approved successfully and ready to buy'))
          //this has to be the last thing to run otherwhise state issues
          onApproveSuccessSGTU({ state, receipt })
        }
      } catch (error) {
        dispatch({ type: 'approve_error_to_user' })
        toastError(t('Error'), t('You have rejected the transaction' ))
      }
    },
    handleConfirmSGTU: async () => {
      try {
        dispatch({ type: 'confirm_sending_to_user' })
        const tx = await onConfirmSGTU()
        const receipt = await tx.wait()

        if (receipt.status) {
          const tokenId = receipt.logs[receipt.logs.length - 1].topics[receipt.logs[receipt.logs.length - 1].topics.length - 1]
          const id = parseInt(tokenId, 16);
          const data = {
            tokenId: id,
            customization3DJson: {},
            ipfsJson: nft
          }
// console.log("dataaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", data)
          const gladiatorAsdded = await addGladiatorsToDB(data)

          if(id == gladiatorAsdded.tokenId){
            setNft(null)
            setMyGladiators(null)
            setUsersGladiators(null)
            dispatch({ type: 'confirm_receipt_to_user' })
            dispatch({ type: 'approve_idle_to_user' })
            dispatch({ type: 'confirm_error2' })
            resetColors()
            toastSuccess(t('success'), t('Gladiator is Bought successfully and sent to battle'))

            //this has to be the last thing to run otherwhise state issues
            onSuccessSGTU({ state, receipt })
          }
        }
      } catch (error) {
        // console.log("eeeeeerrrrrrrrrrooooooor222222222", error)

        dispatch({ type: 'approve_receipt' })
        dispatch({ type: 'approve_receipt_to_user' })
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    },
    handlePriorConfirmSGTU: async () => {
        dispatch({ type: 'confirm_sending_to_user' })
    },
  }
}

export default useApproveConfirmTransaction
