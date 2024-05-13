import dowellLogo from '../public/dowell-logo.png';

export default function Sidebar(){
    return(
        <div className="lg:w-2/12 h-screen bg-black " style={{ backgroundColor: '#54595F', overflowY: 'auto' }}>
            <div style={{ color: '#D3D3D3', fontSize: '15px', fontWeight: '400', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img src={dowellLogo} alt='image' style={{ height: '60px', borderRadius: '8px', marginRight: '15px' }} />
                <h3 style={{ marginRight: '15px' }}>DoWell Scales</h3>
                {/* <AiOutlineMenuFold style={{ fontSize: '25px', color: '#6D6E70' }} /> */}
            </div>
            <div style={{ color: '#6D6E70', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '40px' }}>
                {/* Your menu items */}
            </div>
            <div style={{ color: '#D3D3D3', fontSize: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '40px' }}>
                <img src='https://www.scales.dowellstore.org/wp-content/uploads/2022/12/17.png' alt='User image' style={{ height: '100px', borderRadius: '8px', marginBottom: '15px' }} />
                <h2 style={{ color: 'white', fontSize: '20px' }}>Welcome, Pranai</h2>
                {/* {userInfo?.username} */}
            </div>
        </div>
    )
}
