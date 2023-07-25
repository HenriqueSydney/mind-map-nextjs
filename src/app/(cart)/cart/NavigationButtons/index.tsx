import { ButtonIcon } from '@/components/Buttons/ButtonIcon'

import styles from './styles.module.scss'

enum Actions {
  FORWARD,
  BACKWARD,
  BEGIN,
}

interface INavigationButtons {
  activeStep: number
  handleChangeStep: (action: Actions) => void
  handleCreatePreference: () => void
}

export default function NavigationButtons({
  activeStep,
  handleChangeStep,
  handleCreatePreference,
}: INavigationButtons) {
  return (
    <div className={styles.buttons}>
      {activeStep > 0 && (
        <ButtonIcon
          title="Voltar"
          type="button"
          onClick={() => handleChangeStep(Actions.BACKWARD)}
        />
      )}
      {activeStep < 2 && (
        <ButtonIcon
          title="Avançar"
          type="button"
          onClick={
            activeStep === 1
              ? () => handleCreatePreference()
              : () => handleChangeStep(Actions.FORWARD)
          }
        />
      )}
    </div>
  )
}
