import bgMain from '@/assets/images/bg-main.png'

export const Hero = () => {
    return (
        <section className='w-full'>
            <div
                style={{ backgroundImage: `url(${bgMain.src})` }}
                className='mt-12 min-h-96 w-full rounded-[60px] bg-[#e6ddb9] bg-cover bg-center bg-no-repeat px-20 pb-24 pt-20 text-background shadow-[0px_12px_#394e1f] max-md:rounded-[40px] max-md:bg-[length:400px] max-md:bg-right-bottom max-md:p-10'>
                <div className='max-w-[740px] max-md:text-center'>
                    <h1 className='text-5xl font-bold leading-tight max-md:text-4xl'>
                        Чайна лавка блаблаблабал фвіфів
                    </h1>
                    <p className='mt-8 text-xl max-md:text-lg'>
                        Привіт! На зв’язку Максим та Сашко. Ми хочемо поширювати чайну
                        культуру в Україні, пропонуємо вам асортимент чаю блаблабл Привіт!
                        На зв’язку Максим та Сашко. Ми хочемо поширювати чайну культуру в
                        Україні, пропонуємо вам асортимент чаю блаблабл
                    </p>
                </div>
            </div>
        </section>
    )
}
