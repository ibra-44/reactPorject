import {Account, Avatars,
     Client,Databases,ID ,Query} from "react-native-appwrite";
export const config ={ 
    endpoint :'https://cloud.appwrite.io/v1',
    platform:'com.jsm.reactNew' , 
    projectId: '6695a08a002ae1240e1f',
    databaseId:'6695a2a9003da9ed2667',
    userCollectionId:'6695a2e70004ed3f6198', 
    videoCollectionId:'6695a32d0032a0aa9f7f',
    storageId:'6695ae36001bdcf0f74a'
};

// Init your React Native SDK
const client = new Client();

 client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform);

    const account = new Account(client);
    const avatars = new Avatars(client); 
    const databaes = new Databases(client); 
   // Register user
export const createUser= async(email, password, username)=> {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount)    throw new Error("Account creation failed");

    const avatarUrl = avatars.getInitials(newAccount.name);

    await signIn(email, password);

    const newUser = await databaes.createDocument(
      
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar:avatarUrl,
      }
   
    );

    return newUser;
  } catch (error) {
    throw new Error(error);
  }
}

//all done here for appwrite prohited excpetion issue
// Sign In
export async function signIn(email, password){
  try {
//await before account might be needed 
   const session =  await account.createEmailPasswordSession(email, password) ;
    return session; 
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
// Get Account
export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    throw new Error(error);
  }
}

//to check the user if it in the database or not
export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();
    if (!currentAccount) throw Error;

    const currentUser = await Databases.listDocuments(
      config.databaseId,
      config.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}